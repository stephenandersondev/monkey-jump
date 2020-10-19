class GamesController < ApplicationController

    def index
        top_scores = Game.top_ten
        render json: top_scores, only: [:player_id, :score], include: { player: {only: [:username]}}
    end
end
