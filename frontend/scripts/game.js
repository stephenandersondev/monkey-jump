class Game {
    constructor(player) {
        this.player = player
        this.score = 0
    }
    test = () => {
        ++this.score
        console.log(this.player, this.score)
    }
}