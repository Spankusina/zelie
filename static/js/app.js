class Players {
    constructor(name, totalScore, stringScore) {
        this.name = name
        this.totalScore = parseInt(totalScore)
        this.stringScore = stringScore
    }

    accScore(curentScore) {
        this.totalScore += parseInt(curentScore)
        this.blockTotalScore.textContent = this.totalScore
        this.stringScore === ''? this.stringScore = curentScore : this.stringScore += ', ' + curentScore
        this.blockScoreBoard.textContent = this.stringScore
    }
}

const addPlayerButton = document.querySelector('#addPlayer')
const startGameButton = document.querySelector('#startGame')
const namePlayerInput = document.querySelector('.inputNamePlayer')
const forAddPlayer = document.querySelector('.forAddPlayer')
const container = document.querySelector('.container')
const control = document.querySelector('.control')
let nameCheckboxs, scoreRadio, headerNamePlayer, apllyMoveButton, formInputScore
let listPlayers = []
let scoreOptions = [0, 1, 2, 3, 4, 6, 8, 10]
let playersMove = 0

// Слушаем клик по копке добавления игрока
addPlayerButton.onclick = () => {
    addPlayer(namePlayerInput.value)
    namePlayerInput.value = ''
    namePlayerInput.focus()
}

// Слушаем клик по кнопке начала игры
startGameButton.onclick = () => {
    forAddPlayer.style.display = 'none'
    addScoreControlPanel()
    updateGlobalValues()
    addEvents()
    preparationForMove()
}

// Добавляем игрока
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
    player.blockTotalScore = document.querySelector(`#pl${listPlayers.length} .totalScore`)
    player.blockScoreBoard = document.querySelector(`#pl${listPlayers.length} .scoreBoard`)
    checkStatusButtons()
}

// Делаем доступными кнопки "добавления игрока" и "старт игры" в зависимости от количества игроков
function checkStatusButtons() {
    if (listPlayers.length === 2) {
        startGameButton.disabled = false
    }

    if (listPlayers.length === 4) {
        addPlayerButton.disabled = true
        namePlayerInput.disabled = true
    }
}

// После старта игры добавляем панель управления очками
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
        <input type="checkbox" disabled id="Player${numberPlayer}" name="Players" value="${numberPlayer}">
        <label class="disabled" for="Player${numberPlayer}">${player.name}</label>
        `
    })

    scoreControlPanel += `
        <br>
        </form>
        <button id="apllyMove">Применить</button>
    `

    control.insertAdjacentHTML('beforeend', scoreControlPanel)
}

// Обновляем глобальные переменные после добавления новых элементов
function updateGlobalValues(){
    headerNamePlayer = document.querySelector('.headerNamePlayer')
    nameCheckboxs = document.querySelectorAll('input[name=Players')
    scoreRadio = document.querySelectorAll('input[name=Score]')
    apllyMoveButton = document.querySelector('#apllyMove')
    formInputScore = document.querySelector('.forInputScore')
}

// Добавляем события на клик после добавления новых элементов
function addEvents(){
    apllyMoveButton.onclick = () => {
        processingMove()
        preparationForMove()
    }

    formInputScore.addEventListener('input', function(event) {
        const inputElement = event.target;
        console.log(`Value changed for element ${inputElement.name}: ${inputElement.value}`);
        if (inputElement.name === 'Score'){
            if (apllyMoveButton.disabled){
                apllyMoveButton.disabled = false
            }

            if (parseInt(inputElement.value) > 3) {
                toggleAvailabilityCheckboxs(true)
            }
            else {
                toggleAvailabilityCheckboxs(false)
            }
        }
    })
}

//Переключаем доступность имен для выбора доп очков
function toggleAvailabilityCheckboxs(available) {
    if (available){
        nameCheckboxs.forEach(name => {
            if (name.disabled) {
                name.disabled = false
            }                

            const label = name.nextElementSibling
            if (label.classList.contains("disabled")){
                label.classList.remove("disabled")
            }
        })
    }
    else{
        nameCheckboxs.forEach(name => {
            if (!name.disabled) {
                name.disabled = true
            }                

            if (name.checked) {
                name.checked = false
            }

            const label = name.nextElementSibling
            if (!label.classList.contains("disabled")){
                label.classList.add("disabled")
            }
        })
    }
}

// Размещаем правильные данные до применения хода
function preparationForMove(){
    playersMove < listPlayers.length ? playersMove += 1 : playersMove = 1
    headerNamePlayer.textContent = listPlayers[playersMove - 1].name
    let playerId = `Player${playersMove}`

    nameCheckboxs.forEach((name) => {
        const label = name.nextElementSibling
        if (label && label.style.display === 'none') {
            label.style.display = "inline-block"
        }

        if (label && name.id === playerId) {
            label.style.display = "none"
        }
    })

    apllyMoveButton.disabled = true
    toggleAvailabilityCheckboxs(false)
}

// Обработка хода
function processingMove(){
    let scoreValue
    for (const score of scoreRadio){
        if (score.checked){
            listPlayers[playersMove - 1].accScore(score.value)
            scoreValue = score.value
            score.checked = false
            break
        }
    }
    
    for (const name of nameCheckboxs){
        if (name.checked) {
            listPlayers[name.value - 1].accScore(scoreValue / 2)
            name.checked = false
        }
    }
}