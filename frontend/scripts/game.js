class GameSession {
    constructor(player) {
        this.player = player
    }
}


const grid = document.querySelector(".grid")
let currentUser

function getUser(user) {
    currentUser = user
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
const gridHeight = 850
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
}

function createDoodler() {
    grid.appendChild(doodler)
    doodler.classList.add('doodler')
    //start doodler on first platform left
    doodlerLeftSpace = platforms[0].left
    doodler.style.left = doodlerLeftSpace + 'px'
    doodler.style.bottom = doodlerBottomSpace + 'px'
}

class Platform {
    constructor(newPlatBottom) {
        this.bottom = newPlatBottom
        //change this when changing width of game
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
        // will change when resizing platform
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
                platforms.shift()
                score += 100
                let newPlatform = new Platform(gridHeight)
                platforms.push(newPlatform)
            }
        })
    }
}

function fall() {
    clearInterval(upTimerId)
    isJumping = false
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
            }
        })
    },30)
}

function gameOver() {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild)
    }
    clearInterval(upTimerId)
    clearInterval(downTimerId)
    clearInterval(leftTimerId)
    clearInterval(rightTimerId)
    clearInterval(movePlatforms)
    saveGame(currentUser, score)
    grid.innerHTML = score
    startButton()
}

function jump() {
    clearInterval(downTimerId)
    isJumping = true 
    upTimerId = setInterval(function () {
        doodlerBottomSpace += 20
        doodler.style.bottom = doodlerBottomSpace + 'px'
        if (doodlerBottomSpace > startPoint + 200) {
            fall()
        }
    },30)
}

function control(e) {
    if(e.key === "ArrowLeft") {
        moveLeft()
    } else if (e.key === "ArrowRight") {
        moveRight()
    } else if (e.key === "ArrowUp") {
          
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
        createPlatforms()
        createDoodler()
        setInterval(movePlatforms, 30)
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
}