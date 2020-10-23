const grid = document.querySelector(".grid")
let currentPlayer
let backMusic

function getUser(user) {
    currentPlayer = user
}

function startButton() {
    let startBtn = document.createElement("div")
    startBtn.className = "display-3"
    startBtn.innerHTML = "Start"
    startBtn.addEventListener("click", (e) => {
        start()
        startBtn.className = "remove"
    })
    grid.append(startBtn)
}

startButton()

const doodler = document.createElement("div")
const gridWidth = 800
//made 50px shorter here because game was not contained on screen
const gridHeight = 800
const doodlerWidth = 60
const doodlerHeight = 85
const platformWidth = 125
const platformHeight = 30
let doodlerLeftSpace = 50
let startPoint = 150
let doodlerBottomSpace = startPoint
let platformCount = 8
let platforms = []
let upTimerId
let downTimerId
let isJumping = true
let isGoingLeft = false
let isGoingRight = false
let leftTimerId
let rightTimerId
let score = 0
let platInterval


const clean = "border:0px solid white;padding: 20px 0px 0px 20px;"
const gameDiv = document.querySelector("#game-div")
const userPanel = document.querySelector("#user-panel")
const playerUl = document.querySelector("#pers-scores")
const name = document.createElement('h5')
name.className = "top-five-heading"
name.style = clean
userPanel.append(name, playerUl)
gameDiv.append(userPanel)

const renderPersScores = (games) => {
    while (playerUl.firstChild) {
        playerUl.removeChild(playerUl.firstChild)
    }
    games.forEach(game => {
       let score = document.createElement("li")
       score.style = clean
       score.innerText = game.score
       score.className = "list-group-item"
       playerUl.append(score)
    })
}

function gameReset() {
    grid.innerHTML = ""
    score = 0
    platforms = []
    doodlerLeftSpace = 50
    startPoint = 150
    doodlerBottomSpace = startPoint
    platformCount = 8
    isJumping = true
    isGoingLeft = false
    isGoingRight = false
    clearInterval(upTimerId)
    clearInterval(downTimerId)
    clearInterval(leftTimerId)
    clearInterval(rightTimerId)
}

function createDoodler() {
    grid.appendChild(doodler)
    doodler.classList.add('doodler')
    doodlerLeftSpace = platforms[0].left
    doodler.style.left = doodlerLeftSpace + 'px'
    doodler.style.bottom = doodlerBottomSpace + 'px'
}

class Platform {
    constructor(newPlatBottom) {
        this.bottom = newPlatBottom
        this.left = Math.random() * (gridWidth - platformWidth)
        this.visual = document.createElement("div")
        const visual = this.visual
        visual.classList.add("platform")
        visual.style.left = this.left + 'px'
        visual.style.bottom = this.bottom + "px"
        grid.appendChild(visual)
    }
}

function createPlatforms() {
    for (let i = 0; i < platformCount; i++) {
        let platformGap = gridHeight / platformCount
        let newPlatBottom = 100 + i * platformGap
        let newPlatform = new Platform(newPlatBottom)
        platforms.push(newPlatform)
    }
}

function movePlatforms() {
    if (doodlerBottomSpace > 200) {
        platforms.forEach(platform => {
            platform.bottom -= 4
            let visual = platform.visual
            visual.style.bottom = platform.bottom + 'px'
            if (platform.bottom < 10) {
                let firstPlatform = platforms[0].visual
                firstPlatform.classList.remove("platform")
                // firstPlatform.remove()
                platforms.shift()
                score += 100
                let newPlatform = new Platform(gridHeight)
                platforms.push(newPlatform)
            }
        })
    }
}

function fall() {
    isJumping = false
    clearInterval(upTimerId)
    downTimerId = setInterval(function () {
        doodlerBottomSpace -= 5
        doodler.style.bottom = doodlerBottomSpace + 'px'
        if (doodlerBottomSpace <= 0) {
            gameOver()
        }
        platforms.forEach(platform => {
            if (
                (doodlerBottomSpace >= platform.bottom) &&
                (doodlerBottomSpace <= platform.bottom + 15) &&
                ((doodlerLeftSpace + doodlerWidth) >= platform.left) &&
                (doodlerLeftSpace <= (platform.left + doodlerHeight)) &&
                !isJumping
            ) {
                startPoint = doodlerBottomSpace
                jump()
                isJumping = true
            }
        })
    },20)
}

function cleanGrid() {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild)
    }
}

function gameOver() {
    cleanGrid()
    console.log(grid)
    clearInterval(upTimerId)
    clearInterval(downTimerId)
    clearInterval(leftTimerId)
    clearInterval(rightTimerId)
    clearInterval(platInterval)
    backMusic.stop()
    let gameOverSound = new SoundEffect("assets/sound/game-over-sound.mp3")
    gameOverSound.play()
    setTimeout(function(){backMusic.play()},1550)
    saveGame(currentPlayer.username, score)
    grid.innerHTML = score
    startButton()
}

let jumpSound

function jump() {
    clearInterval(downTimerId)
    isJumping = true 
    jumpSound.play()
    delete jumpSound
    upTimerId = setInterval(function () {
        doodlerBottomSpace += 20
        doodler.style.bottom = doodlerBottomSpace + 'px'
        if (doodlerBottomSpace > startPoint + 200) {
            fall()
            isJumping = false
        }
    },30)
}

function control(e) {
    doodler.style.bottom = doodlerBottomSpace + 'px'
    if(e.key === "ArrowLeft") {
        moveLeft()
    } else if (e.key === "ArrowRight") {
        moveRight()
    } else if (e.key === "ArrowUp") { 
        moveStraight()   
    }
}

function moveLeft() {
    if (isGoingRight) {
        clearInterval(rightTimerId)
        isGoingRight = false
    }
    isGoingLeft = true
    leftTimerId = setInterval(function () {
        if (doodlerLeftSpace >= 0) {
        doodlerLeftSpace -= 4
        doodler.style.left = doodlerLeftSpace + 'px'
        } else moveRight()
    },20)
}

function moveRight() {
    if (isGoingLeft) {
        clearInterval(leftTimerId)
        isGoingLeft = false
    }
    isGoingRight = true
    rightTimerId = setInterval(function () {
        if (doodlerLeftSpace <= (gridWidth - doodlerWidth)) {
            doodlerLeftSpace += 4
            doodler.style.left = doodlerLeftSpace + 'px'
        } else moveLeft()
    },20)
} 

function moveStraight() {
    isGoingRight = false
    isGoingLeft = false
    clearInterval(rightTimerId)
    clearInterval(leftTimerId)
}

function start() {
        gameReset()
        jumpSound = new SoundEffect("assets/sound/BounceYoFrankie.flac")
        createPlatforms()
        createDoodler()
        platInterval = setInterval(movePlatforms, 30)
        jump()
        document.addEventListener('keydown', control)
}


function saveGame(player, score) {
    fetch("http://localhost:3000/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            username: player,
            score: score
        })
    })
    .then(res => res.json())
    .then(games => renderPersScores(games))
}

class SoundEffect {
    constructor(src) {
        this.src = src
        this.sound = document.createElement("audio")
        this.sound.src = this.src
        this.sound.setAttribute("preload", "auto")
        this.sound.setAttribute("controls", "none")
        this.sound.style.display = "none"
        document.body.appendChild(this.sound)
    }
    
    play() {
      this.sound.play()
    }

    stop() {
      this.sound.pause();
    }

  }

  class SoundMusic {
    constructor(src) {
        this.src = src
        this.sound = document.createElement("audio")
        this.sound.src = this.src
        this.sound.setAttribute("preload", "auto")
        this.sound.setAttribute("controls", "none")
        this.sound.setAttribute("loop", "loop")
        this.sound.style.display = "none"
        document.body.appendChild(this.sound)
    }
    
    play() {
      this.sound.play()
    }

    stop() {
      this.sound.pause();
    }

  }