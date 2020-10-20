class GameSession {
    constructor(player) {
        this.player = player
    }
}

let canvas = document.getElementById("game-canvas")
let ctx = canvas.getContext("2d")

class Game {
    constructor() {
        this.score = 0
    }
}

let startBtn = document.getElementById("start-game")
startBtn.addEventListener("click", (e) => {
    let gameInstance = new Game()
    console.log(gameInstance.score)
    console.log('Ive been clicked')
})
