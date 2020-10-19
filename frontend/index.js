fetch("http://localhost:3000/")
    .then(res => res.json())
    .then(games => {
        games.forEach(game => renderLeaderboard(game))
    })

    let scoreDiv = document.querySelector("#score-div")
    let leaderUl = document.querySelector("#score-list")
    scoreDiv.append(leaderUl)

let renderLeaderboard = (item) => {
        let itemLi = document.createElement("li")
        itemLi.className = "list-group-item"
        itemLi.innerText = `${item.player.username}\u00A0\u00A0\u00A0${item.score}`
        leaderUl.append(itemLi)
        console.log(item)
   }