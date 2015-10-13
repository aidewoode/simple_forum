# Beacuse "attributes :id" return a integer value, but
# JSON API need the value of the id must be strings.
node(:id) { |post| post.id.to_s }

node(:type) { "posts" }
node :attributes do |post|
  {
    title: post.title,
    body: post.body,
    tag: post.tag
  }
end
