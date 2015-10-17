class User < Sequel::Model
  plugin :validation_helpers

  attr_accessor :password_confirmation
  attr_accessor :password

  one_to_many :posts
  one_to_many :comments

  def authenticate(input_password)
    self if BCrypt::Password.new(password_digest) == input_password
  end

  def before_create
    self.password_digest = BCrypt::Password.create(password)
    super
  end

  def validate
    super
    validates_presence [:name, :email, :password, :password_confirmation]
    validates_unique [:name, :email]
    errors.add :password, 'password and confirmation not the same' if password != password_confirmation
  end
end
