const App = {
    data() {
        return {
            inputNameDisabled: false,
            listPlayers: [],
            playersForExtraScore: [],
            inputNameValue: '',
            inputScore: '',
            scoreOptions: [0, 1, 2, 3, 4, 6, 8, 10],
            isGameStarted: false,
            isDisabledExtraScore: true,
            playerTurn: ''
        }
    },
    methods: {
        addNewPlayer() {
            if (this.inputNameValue != '' && !this.listPlayers.includes(this.inputNameValue)){
                this.listPlayers.push(this.inputNameValue)
            }
            this.inputNameValue = ''
        },
        startGame() {
            this.playerTurn = this.listPlayers[0]
            this.isGameStarted = true
        },
        updateScore() {
            const index = this.listPlayers.indexOf(this.playerTurn) < (this.listPlayers.length - 1) ? (this.listPlayers.indexOf(this.playerTurn) + 1) : 0
            this.playerTurn = this.listPlayers[index]
            this.inputScore = ''
        }
    },
    watch: {
        inputScore(value) {
            if (value === '' || (value) < 4) {
                this.isDisabledExtraScore = true
            }
            else {
                this.isDisabledExtraScore = false
            }
        }
    }
}

Vue.createApp(App).mount("#app")