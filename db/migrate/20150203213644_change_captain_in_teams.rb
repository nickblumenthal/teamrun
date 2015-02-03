class ChangeCaptainInTeams < ActiveRecord::Migration
  def change
    rename_column :teams, :captain, :captain_id
  end
end
