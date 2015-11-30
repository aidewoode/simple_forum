# Beacuse "attributes :id" return a integer value, but
# JSON API need the value of the id must be strings.
node(:id) { |post| post.id.to_s }

node(:type) { "posts" }
node :attributes do |post|
  {
    title:           post.title,
    body:            post.body,
    tag:             post.tag,
    created_at:      post.created_at,
    updated_at:      post.updated_at,
    comments_count:  post.comments.count,
    category:        post.category,
    last_reply_time: post.last_reply_time,
    user_avatar:     post.user.avatar.url
  }
end
