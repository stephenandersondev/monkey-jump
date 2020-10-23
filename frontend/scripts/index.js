const baseURL = "http://localhost:3000/"
let scoreDiv = document.querySelector("#score-div")
let leaderUl = document.querySelector("#score-list")
let leaderUl2 = document.querySelector("#score-list2")
scoreDiv.append(leaderUl, leaderUl2)

function clearLeaderboard() {
     while (leaderUl.firstChild) {
        leaderUl.removeChild(leaderUl.firstChild)
    }
    while (leaderUl2.firstChild) {
        leaderUl2.removeChild(leaderUl2.firstChild)
    }
}

function fetchLeaderboard() {
    clearLeaderboard()
    fetch(baseURL)
        .then(res => res.json())
        .then(games => {
            games.forEach(game => renderLeaderboard(game))
        })
}

fetchLeaderboard()
let backMusicDelay

let renderLeaderboard = (item) => {
    let itemLi = document.createElement("li")
    itemLi.className = "list-group-item"
    itemLi.innerText = `${item.player.username.toUpperCase()}\u00A0${item.score}`
    itemLi.id = "score-li"
    itemLi.style = clean
    if (leaderUl.childElementCount < 5) {
        leaderUl.append(itemLi)
    } else {
        leaderUl2.append(itemLi)
    }
}

const loginForm = document.getElementById("login-form")
loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    backMusic = new SoundMusic("assets/sound/tarzan-music.mp3")
    let monkeyScream = new SoundEffect("assets/sound/monkey-scream-low.mp3")
    monkeyScream.play()
    backMusicDelay = setTimeout(function () { backMusic.play() }, 2100)
    let user = document.getElementById("username").value.toUpperCase()
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
    getUser(user)
    currentUser = user.username
    name.innerHTML = `${currentUser}'s <br/> Top 5:`
}

const mainDiv = document.getElementById("main-div")

const loadGameScreen = () => {
    mainDiv.className = "hidden"
    gameDiv.className = "container-fadein"
}

const logout = document.getElementById("logout-button")
logout.addEventListener("click", (e) => {
    e.preventDefault()
    fetchLeaderboard()
    loadMainScreen()
    clearTimeout(backMusicDelay)
    backMusic.stop()
})

const loadMainScreen = () => {
    gameDiv.className = "hide"
    mainDiv.className = "container-fadein"
}