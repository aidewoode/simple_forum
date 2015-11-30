object @comment
node(:id) { |comment| comment.id.to_s }
node(:type) { "comments" }
node :attributes do |comment|
  {
    body: comment.body,
    created_at: comment.created_at,
    updated_at: comment.updated_at
  }
end
