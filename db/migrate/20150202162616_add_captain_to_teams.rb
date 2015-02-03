class AddCaptainToTeams < ActiveRecord::Migration
  def change
    add_column :teams, :captain, :integer, null: false
  end
end
