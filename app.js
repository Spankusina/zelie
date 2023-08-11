const addPlayerButton = document.querySelector('#addPlayer')
const startGameButton = document.querySelector('#startGame')
const namePlayerInput = document.querySelector('.inputNamePlayer')
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
    checkStatusButtons()
    console.log(listPlayer)
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