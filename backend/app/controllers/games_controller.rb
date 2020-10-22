class GamesController < ApplicationController
  def index
    top_scores = Game.top_ten
    render json: top_scores, only: [:player_id, :score], include: { player: { only: [:username] } }
  end

  def create
    user = Player.find_by(username: params[:username])
    Game.create(player_id: user.id, score: params[:score])
    scores = user.top_five
    render json: scores
  end
end
