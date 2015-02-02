class AddExternalUserIdToUsers < ActiveRecord::Migration
  def change
    add_column :users, :external_user_id, :string
    add_index :users, :external_user_id
  end
end
