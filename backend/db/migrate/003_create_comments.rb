Sequel.migration do
  change do
    create_table(:comments) do
      primary_key :id
      String :body, text: true
      DateTime :created_at
      DateTime :updated_at
    end
  end
end
