require "sinatra"
require "sinatra/activerecord"
require "sinatra/json"
require "json"
require "will_paginate"
require "will_paginate/active_record"
require "qiniu"
require "carrierwave"
require "carrierwave/orm/activerecord"
require "carrierwave-qiniu"
require "i18n"
require "i18n/backend/fallbacks"
require "sanitize"
require "./environments"

module CustomSerializer # need to improve
  def custom_serialize(*replace_list)
    attributes = self.attributes #return a hash
    attributes.delete_if do |key, value|
      replace_list.include?(key) 
    end

    replace_list.each do |value| 
      attributes.store(value[0, value.index("_")], self.send(value))
    end

    attributes
  end

end


class AvatarUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick


  storage :qiniu
  self.qiniu_protocal = "http"
  self.qiniu_can_overwrite = true

  process :resize_to_fit => [100,100]

  def store_dir
    "avatar"
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  def filename
    "avatar#{model.id}" if original_filename.present?
  end

  def default_url
    "http://cnnirvana.qiniudn.com/avatar/default.png"
  end
end

class Post < ActiveRecord::Base
  include CustomSerializer

  validates :title, presence: true, length: { minimum: 3}
  validates :body, presence: true
  validates :tag, presence: true
  validates :user_id , presence: true

  has_many :comments, dependent: :destroy
  belongs_to :user



end 

class User < ActiveRecord::Base
  include CustomSerializer

  before_save { |user| user.email = email.downcase ; user.name = name.downcase }

  VALID_NAME = /\A\w+\z/
  validates :name, presence: true, format: { with: VALID_NAME }, length: { maximum: 25 }, uniqueness: { case_sensitive: false }
  VALID_EMAIL = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, format: { with: VALID_EMAIL },uniqueness: { case_sensitive: false }
  validates :password, presence: true, length: { minimum: 6 }, on: :create
  validates :password_confirmation, presence: true, on: :create

  mount_uploader :avatar, AvatarUploader
  
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :notifications, dependent: :destroy
  has_many :session_tokens, dependent: :destroy

  has_secure_password

  def session_active_token
    session_tokens.active.first_or_create
  end
end

class Comment < ActiveRecord::Base
  include CustomSerializer

  validates :body, presence: true
  validates :user_id, presence: true
  validates :post_id, presence: true
  has_many :notifications, dependent: :destroy

  belongs_to :post
  belongs_to :user
end

class Notification < ActiveRecord::Base
  include CustomSerializer

  validates :user_id, presence: true
  validates :comment_id, presence: true
  belongs_to :user
  belongs_to :comment
end

# use redis to store user's sessions

class SessionToken < ActiveRecord::Base
  include CustomSerializer

  before_create :generate_access_token, :set_expiry_date
  belongs_to :user

  scope :active, -> { where("expired_at >= ?", Time.now)}

  private

  def generate_access_token
    begin
      self.access_token = SecureRandom.hex
    end while self.class.exists?(access_token: access_token)
  end

  def set_expiry_date
    self.expired_at = 5.hours.from_now
  end

end
## post routes
#
get "/posts" do
  posts = []
  if user = User.find_by_id(params[:user_id])
    totalPost = user.posts.paginate(:page => params[:page], :per_page => 10)
    totalPost.each do |post|
      post_hash = post.custom_serialize("user_id")
      post_hash.store("commentsCount", post.comments.count)
      posts.push(post_hash)
    end
  else
    totalPost = Post.paginate(:page => params[:page], :per_page => 10).order("last_reply_time DESC")
    totalPost.each do |post|
      post_hash = post.custom_serialize("user_id")
      post_hash.store("comments", post.comment_ids)
      # add commentsCount key to avoid ember send too much request to count the number of 
      # a post's comments
      #
      post_hash.store("commentsCount", post.comments.count)
      post_hash.store("userAvatar", post.user.avatar_url)
      post_hash.store("postUserName", post.user.name)
      post_hash.store("user_id", post.user.id)
      if post.comments.last
        post_hash.store("lastCommentUserName", post.comments.last.user.name)
      end
      posts.push(post_hash)
    end
  end

  output_hash = {posts: posts}
  output_hash.store("meta", {total_pages: totalPost.total_pages})

  json output_hash

end

get "/posts/:id" do
  if (post = Post.find_by_id(params[:id]))
    comments = post.comments
    
    post_hash = post.custom_serialize("user_id")
    post_hash.store("userAvatar", post.user.avatar_url)
    post_hash.store("commentsCount", post.comments.count)
    post_hash.store("comments", post.comment_ids)
    post_hash.store("postUserName", post.user.name)
    post_hash.store("user_id", post.user.id)

    output_hash = {post: post_hash} 

    json output_hash
  else
    halt 404, json({})
  end
end

post "/posts" do
  request.body.rewind
  data = JSON.parse request.body.read
  # need add post and user's relationship
  #
  post = Post.new(data["post"])
  if post.save
    halt 201, json({})
  else
    halt 422 ,json({errors: user.errors.full_messages})
  end

end


# user routes


get "/users/:id" do
  if (user = User.find_by_id(params[:id]))
    notifications = user.notifications
    notifications_array = notifications.map {|noti| noti.custom_serialize("user_id", "comment_id")}

    user_hash = user.custom_serialize
    user_hash.store("notifications", user.notification_ids)
    user_hash.store("posts", user.post_ids)
    user_hash.store("comments", user.comment_ids)
    user_hash.delete("password_digest")
    user_hash.delete("admin")
    user_hash["avatar"] = user.avatar_url

    output_hash = {user: user_hash}
    output_hash.store("notifications", notifications_array)

    json output_hash
  else
    halt 404, json({})
  end

end

post "/users" do
  request.body.rewind
  data = JSON.parse request.body.read
  user = User.new(data["user"].delete_if {|key, value| key == "admin"})
  if user.save
    halt 201, json({token: user.session_active_token})
  else
    halt 422 ,json({errors: user.errors.full_messages})
  end

end


#comment routes
#
#
get "/comments" do
  comments = []
  if (post = Post.find_by_id(params[:post_id]))
    totalComment = post.comments.paginate(:page => params[:page], :per_page => 10)
    totalComment.each do |comment|
      comment_hash = comment.custom_serialize("user_id", "post_id")
      comment_hash.store("userAvatar", comment.user.avatar_url)
      comment_hash.store("commentUserName", comment.user.name)
      comment_hash.store("commentPostName", comment.post.title)
      comment_hash.store("user_id", comment.user.id)
      comments.push(comment_hash)
    end

  elsif user = User.find_by_id(params[:user_id])
    totalComment = user.comments.paginate(:page => params[:page], :per_page => 10)
    totalComment.each do |comment|
      comment_hash = comment.custom_serialize("user_id", "post_id")
      comment_hash.store("commentPostName", comment.post.title)
      comments.push(comment_hash)
    end
  end
  output_hash = {comments: comments}
  output_hash.store("meta", {total_pages: totalComment.total_pages})

  json output_hash
end

get "/comments/:id" do
  if (comment = Comment.find_by_id(params[:id]))
    notifications = comment.notifications
    notifications_array = notifications.map {|noti| noti.custom_serialize("user_id", "comment_id")}

    comment_hash = comment.custom_serialize("post_id", "user_id")
    comment_hash.store("userAvatar", comment.user.avatar_url)
    comment_hash.store("commentUserName", comment.user.name)
    comment_hash.store("commentPostName", comment.post.title)
    comment_hash.store("user_id", comment.user.id)
    comment_hash.store("notifications", comment.notification_ids)

    output_hash = {comment: comment_hash}
    output_hash.store("notifications", notifications_array)

    json output_hash
  else
    halt 404, json({})
  end

end

#notification routes

get "/notifications/:id" do
  if (notification = Notification.find_by_id(params[:id]))
    notification_hash = notification.custom_serialize("user_id", "comment_id")

    output_hash = {notification: notification_hash}

    json output_hash
  else
    halt 404, json({})
  end
end

#session route
#
post "/session" do
  user = User.find_by_email(params[:email])
  if user && user.authenticate(params[:password])
    halt 201, json({token: user.session_active_token})
  else
    halt 401, json({})
  end
end


