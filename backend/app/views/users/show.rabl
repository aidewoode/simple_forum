object @user
node(:id) { |user| user.id.to_s }
node(:type) { "users" }
node :attributes do |user|
  {
    name:  user.name,
    email: user.email
  }
end
