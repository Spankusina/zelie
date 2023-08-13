class Players {
    constructor(name, totalScore, stringScore) {
        this.name = name
        this.totalScore = totalScore
        this.stringScore = stringScore
    }

    accScore(curentScore) {
        this.totalScore =+ curentScore
    }
}

const addPlayerButton = document.querySelector('#addPlayer')
const startGameButton = document.querySelector('#startGame')
const namePlayerInput = document.querySelector('.inputNamePlayer')
const forAddPlayer = document.querySelector('.forAddPlayer')
const container = document.querySelector('.container')
const control = document.querySelector('.control')
let headerNamePlayer = ''
let listPlayers = []
let scoreOptions = [0, 1, 2, 3, 4, 6, 8, 10]
let playersMove = 0

addPlayerButton.onclick = () => {
    addPlayer(namePlayerInput.value)
    namePlayerInput.value = ''
    namePlayerInput.focus()
}

startGameButton.onclick = () => {
    forAddPlayer.style.display = 'none'
    addScoreControlPanel()
    headerNamePlayer = document.querySelector('.headerNamePlayer')
    preparationForMove()
}

function addPlayer(name) {
    if (!name) {
        return
    }

    const player = new Players(name, 0, '')
    listPlayers.push(player)
    let playerScoreBoard = `
        <div class="players" id="pl${listPlayers.length}">
            <div class="forNamePlayers">
                <p class="namePlayers">${player.name}</p>
                <p class="totalScore">0</p>
            </div>
            <p class="scoreBoard"></p>
        </div>
        `

    container.insertAdjacentHTML('beforeend', playerScoreBoard)
    checkStatusButtons()
}

function checkStatusButtons() {
    if (listPlayers.length === 2) {
        startGameButton.disabled = false
    }

    if (listPlayers.length === 4) {
        addPlayerButton.disabled = true
        namePlayerInput.disabled = true
    }
}

function addScoreControlPanel(){
    let scoreControlPanel = `  
        <form class="forInputScore">
            <h2>Ход игрока: <span class="headerNamePlayer"></span></h2>`
    
    scoreOptions.forEach((option) => {
        scoreControlPanel += `
        <input type="radio" id="Score${option}" name="Score" value="${option}">
        <label for="Score${option}">${option}</label>
        `
    })

    scoreControlPanel += `<h2>Добавить очки игроку:</h2>`

    let numberPlayer = 0
    listPlayers.forEach((player) => {
        numberPlayer += 1
        scoreControlPanel += `
        <input type="checkbox" id="Player${numberPlayer}" name="Players" value="Player${numberPlayer}">
        <label for="Player${numberPlayer}">${player.name}</label>
        `
    })

    scoreControlPanel += `
        <br>
        <button id="apllyMove">Применить</button>
        <button id="endGame">Закончить игру</button>
        </form>
    `

    control.insertAdjacentHTML('beforeend', scoreControlPanel)
}

function preparationForMove(){
    playersMove <= listPlayers.length ? playersMove += 1 : playersMove = 1
    headerNamePlayer.textContent = listPlayers[playersMove - 1].name
    let playerId = `Player${playersMove}`
    const checkboxs = document.querySelectorAll('input[name=Players')

    checkboxs.forEach((checkbox) => {
        const label = checkbox.nextElementSibling
        if (label && label.style.display === 'none') {
            checkbox.style.display = "inline-block"
        }

        if (label && checkbox.id === playerId) {
            label.style.display = "none"
        }
    })

}
