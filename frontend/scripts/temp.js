class GameSession {
    constructor(player) {
        this.player = player
    }
}

const canvas = document.getElementById("game-canvas")
const ctx = canvas.getContext("2d")
const GAME_WIDTH = 750
const GAME_HEIGHT = 900
let lastTime = 0

class Game {
    constructor() {
        this.score = 0
    }
}

let startBtn = document.getElementById("start-game")
startBtn.addEventListener("click", (e) => {
    let gameInstance = new Game()
    let monkey = new Monkey(GAME_WIDTH, GAME_HEIGHT)
    let inputHandlerInstance = new InputHandler(monkey)
    monkey.draw(ctx)
})

let loop = (timestamp) => {
    let dt = timestamp - lastTime
    lastTime = timestamp

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
    monkey.update(dt)
    monkey.draw(ctx)

    requestAnimationFrame(loop)
}

class InputHandler {
    constructor(monkey) {
        document.addEventListener("keydown", e => {
            switch (e.code) {
                case "ArrowLeft":
                    monkey.moveLeft()
                    break;
                case "ArrowRight":
                    monkey.moveRight()
                    break;
            }
        })
    }
}

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
        this.maxSpeed = 10
        this.speed = 0
    }

    draw = (ctx) => {
        ctx.drawImage(this.image, this.image.position.x, this.image.position.y, this.image.width, this.image.height)
    }

    moveLeft = () => {
        this.speed = -this.maxSpeed
    }

    moveRight = () => {
        this.speed = this.maxSpeed
    }

    update = (dt) => {
        if(!dt) return;
        this.image.position.x += this.speed

        if (this.image.position.x < 0) this.image.position.x = 0;
    }
}
loop() 