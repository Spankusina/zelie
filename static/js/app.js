const addPlayerButton = document.querySelector('#addPlayer')
const startGameButton = document.querySelector('#startGame')
const namePlayerInput = document.querySelector('.inputNamePlayer')
const container = document.querySelector('.container')
let listPlayer = []

addPlayerButton.onclick = () => {
    addPlayer(namePlayerInput.value)
    namePlayerInput.value = ''
    namePlayerInput.focus()
}

function addPlayer(name) {
    if (!name) {
        return
    }

    listPlayer.push(name)
    let playerScoreBoard = `
        <div class="players" id="pl${listPlayer.length}">
            <div class="forNamePlayers">
                <p class="namePlayers">${name}</p>
                <p class="totalScore">0</p>
            </div>
            <p class="scoreBoard"></p>
        </div>
        `

    container.insertAdjacentHTML('beforeend', playerScoreBoard)
    checkStatusButtons()
}

function checkStatusButtons() {
    if (listPlayer.length === 2) {
        startGameButton.disabled = false
    }

    if (listPlayer.length === 4) {
        addPlayerButton.disabled = true
        namePlayerInput.disabled = true
    }
}