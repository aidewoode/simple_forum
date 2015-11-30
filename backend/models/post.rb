class Post < Sequel::Model
  plugin :validation_helpers

  one_to_many :comments
  many_to_one :user

  def validate
    super
    validates_presence [:title, :body, :tag]
    validates_includes ['normal', 'top', 'essence'], :category unless new?
  end
end
