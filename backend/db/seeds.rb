# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ste = Player.create(username: "Stephen")
dev = Player.create(username: "Devin")

Game.create(player: ste, score: 100)
Game.create(player: dev, score: 200)
Game.create(player: ste, score: 300)
Game.create(player: dev, score: 400)
Game.create(player: ste, score: 500)
Game.create(player: dev, score: 600)
Game.create(player: ste, score: 700)
Game.create(player: dev, score: 800)
Game.create(player: ste, score: 900)
Game.create(player: dev, score: 1000)
Game.create(player: ste, score: 1100)