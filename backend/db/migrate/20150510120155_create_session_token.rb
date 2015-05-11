class CreateSessionToken < ActiveRecord::Migration
  def change
    create_table :session_tokens do |t|
      t.integer :user_id
      t.string :access_token
      t.datetime :expired_at
      t.timestamps
    end
  end
end
