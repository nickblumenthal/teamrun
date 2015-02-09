class AddLogoUrlToTeams < ActiveRecord::Migration
  def change
    addColumn :teams, :logo, :string
  end
end
