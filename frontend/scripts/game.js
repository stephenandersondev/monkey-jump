class GameSession {
    constructor(player) {
        this.player = player
    }
}

const canvas = document.getElementById("game-canvas")
const ctx = canvas.getContext("2d")
const GAME_WIDTH = 750
const GAME_HEIGHT = 900
ctx.clearRect(0, 0, 750, 900)

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


class Monkey {

    constructor(gameWidth, gameHeight) {
        this.image = new Image()
        this.image.src = 'assets/img/game-img/monkey.png';
        this.image.width = 120
        this.image.height = 120
        this.image.position = {
            x: gameWidth / 2 - this.image.width / 2,
            y: gameHeight - this.image.height - 10
        }
    }

    draw = (ctx) => {
        ctx.drawImage(this.image, this.image.position.x, this.image.position.y, this.image.width, this.image.height)
    }
}

let monkey = new Monkey(GAME_WIDTH, GAME_HEIGHT)
window.onload = function() {
    monkey.draw(ctx)
}