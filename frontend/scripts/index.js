const baseURL = "http://localhost:3000/"
fetch(baseURL)
    .then(res => res.json())
    .then(games => {
        games.forEach(game => renderLeaderboard(game))
    })

let scoreDiv = document.querySelector("#score-div")
let leaderUl = document.querySelector("#score-list")
let leaderUl2 = document.querySelector("#score-list2")
scoreDiv.append(leaderUl, leaderUl2)

let renderLeaderboard = (item) => {
    let itemLi = document.createElement("li")
    itemLi.className = "list-group-item"
    itemLi.innerText = `${item.player.username.toUpperCase()}\u00A0${item.score}`
    itemLi.id = "score-li"
    itemLi.style = "border:0px solid white;padding: 20px 0px 0px 20px;"
    if (leaderUl.childElementCount < 5) {
        leaderUl.append(itemLi)
    } else {
        leaderUl2.append(itemLi)
    }
}

const loginForm = document.getElementById("login-form")
loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let user = document.getElementById("username").value
    fetch(baseURL + "players", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
        username: user
        })
    })
        .then(res => res.json())
        .then(user_data => {
            userLogin(user_data.username)
            renderPersScores(user_data.scores)
            loadGameScreen()
        })
})

const userLogin = (user) => {
    currentUser = user.username
}

const gameDiv = document.querySelector("#game-div")
const userPanel = document.querySelector("#pers-score-list")
const playerUl = document.querySelector("#pers-scores")
userPanel.append(playerUl)
gameDiv.append(userPanel)

const renderPersScores = (games) => {
    games.forEach(game => {
       let score = document.createElement("li")
       score.style = "border:0px solid white;padding: 20px 0px 0px 20px;"
       score.innerText = game.score
       score.className = "list-group-item"
       playerUl.append(score)
    })
}

const loadGameScreen = () => {
    const mainDiv = document.getElementById("main-div")
    mainDiv.className = "hidden"
    gameDiv.className = "container"
    let player = new GameSession(currentUser)
}