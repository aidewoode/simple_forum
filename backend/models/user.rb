class User < Sequel::Model
  plugin :validation_helpers

  one_to_many :posts
  one_to_many :comments

  def validate
    super
    validates_presence [:name, :email]
    validates_unique [:name, :email]
  end
end
