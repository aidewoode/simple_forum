Sequel.migration do
  change do
    create_table(:posts) do
      primary_key :id
      String :title
      String :body, text: true
      String :tag
      DateTime :created_at
      DateTime :updated_at
    end
  end
end
