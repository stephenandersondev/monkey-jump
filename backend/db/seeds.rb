# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Game.destroy_all
Player.destroy_all

ste = Player.create(username: "STEPHEN")
dev = Player.create(username: "DEVIN")
sher = Player.create(username: "SHERIFF")
ben = Player.create(username: "BEN10")
bree = Player.create(username: "BREEZY")
haley = Player.create(username: "HALEY")
jarule = Player.create(username: "JARULE")
jake = Player.create(username: "JAKE")
wes = Player.create(username: "WES")
steph = Player.create(username: "STEPH")
squire = Player.create(username: "SQUIRE")

Game.create(player: sher, score: 100)
Game.create(player: ben, score: 200)
Game.create(player: wes, score: 400)
Game.create(player: ste, score: 900)
Game.create(player: jarule, score: 1400)
Game.create(player: jake, score: 1900)
Game.create(player: steph, score: 3100)
Game.create(player: haley, score: 3400)
Game.create(player: squire, score: 5600)
Game.create(player: bree, score: 9000)

Game.create(player: dev, score: 0)
Game.create(player: dev, score: 0)
Game.create(player: dev, score: 0)
Game.create(player: dev, score: 0)
Game.create(player: dev, score: 0)