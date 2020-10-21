class Player < ApplicationRecord
  has_many :games

  def top_five
    self.games.sort_by { |game| -game.score }.take(5)
  end
end
