class RemoveDifficultyFromGame < ActiveRecord::Migration[6.0]
  def change
    remove_column :games, :difficulty, :string
  end
end
