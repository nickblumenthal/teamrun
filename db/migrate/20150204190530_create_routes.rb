class CreateRoutes < ActiveRecord::Migration
  def change
    create_table :routes do |t|
      t.string :name, null: false
      t.integer :ua_id
      t.integer :user_id, null: false
      t.text :description
      t.json :data, null: false
      t.timestamps null: false
    end
    add_index :routes, :name
    add_index :routes, :ua_id
    add_index :routes, :user_id
  end
end
