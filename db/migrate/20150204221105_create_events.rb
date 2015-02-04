class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer :team_id, null: false
      t.integer :route_id
      t.text :description, null: false
      t.integer :user_id, null: false
      t.date :date, null: false
      t.time :time, null: false
      t.string :location
      t.timestamps null: false
    end
    add_index :events, :team_id
    add_index :events, :user_id
    add_index :events, :date
    add_index :events, :time
    add_index :events, :location
  end
end
