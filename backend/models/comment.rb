class Comment < Sequel::Model
  plugin :validation_helpers

  many_to_one :user
  many_to_one :post

  def validate
    super
    validates_presence :body
  end
end
