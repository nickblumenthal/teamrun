class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false, unique: true
      t.string :password_digest
      t.string :auth_provider, null: false
      t.string :email

      t.timestamps null: false
    end
    add_index :users, :username
    add_index :users, :password_digest
    add_index :users, :email
  end
end
