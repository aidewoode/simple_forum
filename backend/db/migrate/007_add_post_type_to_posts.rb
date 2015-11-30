Sequel.migration do
  change do
    add_column :posts, :category, String, default: 'normal'
    add_column :posts, :last_reply_time, DateTime
  end
end
