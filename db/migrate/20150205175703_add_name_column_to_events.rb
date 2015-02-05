class AddNameColumnToEvents < ActiveRecord::Migration
  def change
    add_column :events, :name, :string, null: false
    add_index :events, :name
  end
end
