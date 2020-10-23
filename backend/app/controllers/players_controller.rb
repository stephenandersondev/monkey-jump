class PlayersController < ApplicationController

    def create
        user = Player.find_or_create_by(username: params[:username].upcase)
        pers_scores = user.top_five
        user_data = {username: user, scores: pers_scores}
        render json: user_data
    end
end
