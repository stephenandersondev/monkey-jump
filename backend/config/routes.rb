Rails.application.routes.draw do
  resources :games
  resources :players
  root "games#index"
  post "/players", to: "players#create"
  post "/games", to: "games#create"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

