const App = {
    data() {
        return {
            inputNameDisabled: false,
            listPlayers: [],
            inputNameValue: '',
            scoreOptions: [0, 1, 2, 3, 4, 6, 8, 10],
            isGameStarted: false,
            playerTurn: ''
        }
    },
    methods: {
        inputNameChangeHandler(event) {
            this.inputNameValue = event.target.value
        },
        addNewPlayer() {
            if (this.inputNameValue != ''){
                this.listPlayers.push(this.inputNameValue)
            }
            this.inputNameValue = ''
        },
        startGame() {
            this.playerTurn = this.listPlayers[0]
            this.isGameStarted = true
        }
    }
}

Vue.createApp(App).mount("#app")