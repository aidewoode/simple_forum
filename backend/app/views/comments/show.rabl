object @comment
node(:id) { |comment| comment.id.to_s }
node(:type) { "comments" }
node :attributes do |comment|
  {
    body: comment.body
  }
end
