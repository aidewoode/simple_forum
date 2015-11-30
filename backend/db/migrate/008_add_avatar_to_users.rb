Sequel.migration do
  change do
    add_column :users, :avatar, String
  end
end
