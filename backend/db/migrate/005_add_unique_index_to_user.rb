Sequel.migration do
  change do
    alter_table :users do
      add_index [:name, :email], unique: true
    end
  end
end
