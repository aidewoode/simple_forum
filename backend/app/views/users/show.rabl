object @user
node(:id) { |user| user.id.to_s }
node(:type) { "users" }
node :attributes do |user|
  {
    name:  user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at
  }
end
