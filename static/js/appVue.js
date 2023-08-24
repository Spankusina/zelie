const App = {
    data() {
        return {
            scoreOptions: [0, 1, 2, 3, 4, 6, 8, 10],
            listPlayers: [],
            inputPlayersForExtraScore: [],
            inputNameValue: '',
            inputScore: '',
            isGameStarted: false,
            isDisabledExtraScore: true,
            indexPlayerTurn: 0
        }
    },
    methods: {
        addNewPlayer() {
            if (this.inputNameValue && !this.listPlayers.includes(this.inputNameValue)){
                const newPlayer = {
                    name: this.inputNameValue,
                    totalScore: 0,
                    stringScore: ''
                }
                this.listPlayers.push(newPlayer)
            }
            this.inputNameValue = ''
            this.$refs.inputFocus.focus()
        },
        startGame() {
            this.isGameStarted = true
        },
        updateScore() {
            this.listPlayers[this.indexPlayerTurn].totalScore += this.inputScore
            this.listPlayers[this.indexPlayerTurn].stringScore = this.listPlayers[this.indexPlayerTurn].stringScore ? this.listPlayers[this.indexPlayerTurn].stringScore + `, ${this.inputScore}` : this.inputScore
            this.indexPlayerTurn = this.indexPlayerTurn < this.listPlayers.length - 1 ? this.indexPlayerTurn + 1 : 0

            this.inputPlayersForExtraScore.forEach(index => {
                this.listPlayers[index].totalScore += this.inputScore / 2
                this.listPlayers[index].stringScore = this.listPlayers[index].stringScore ? this.listPlayers[index].stringScore + `, ${this.inputScore / 2}` : this.inputScore / 2
            })
            
            this.inputScore = ''
            if (this.inputPlayersForExtraScore.length){
                this.inputPlayersForExtraScore.splice(0, this.inputPlayersForExtraScore.length)
            }
        }
    },
    watch: {
        inputScore(value) {
            if (!value || (value) < 4) {
                this.isDisabledExtraScore = true
                this.inputPlayersForExtraScore.splice(0, this.inputPlayersForExtraScore.length)
            }
            else {
                this.isDisabledExtraScore = false
            }
        }
    }
}

Vue.createApp(App).mount("#app")