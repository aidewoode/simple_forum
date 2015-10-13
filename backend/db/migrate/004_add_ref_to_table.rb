Sequel.migration do
  change do
    alter_table :comments do
      add_foreign_key :post_id, :comments, index: true
      add_foreign_key :user_id, :comments, index: true
    end
    alter_table :posts do
      add_foreign_key :user_id, :posts, index: true
    end
  end
end
