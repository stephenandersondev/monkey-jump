class Game < ApplicationRecord
  belongs_to :player

  def self.top_ten
    Game.all.sort_by{|game| -game.score}.take(10)
  end

end
