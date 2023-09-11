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
            indexPlayerTurn: 0,
            currentScore: 0
        }
    },
    methods: {
        addNewPlayer() {
            if (this.inputNameValue && !this.listPlayers.some(player => player.name === this.inputNameValue)  ){
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
            this.animateNumber(this.listPlayers[this.indexPlayerTurn], (this.listPlayers[this.indexPlayerTurn].totalScore + this.inputScore))
      
            if (!this.listPlayers[this.indexPlayerTurn].stringScore.length){
                this.listPlayers[this.indexPlayerTurn].stringScore = `${this.inputScore}`
            }
            else {
                this.listPlayers[this.indexPlayerTurn].stringScore += `, ${this.inputScore}`
            }

            this.indexPlayerTurn = this.indexPlayerTurn < this.listPlayers.length - 1 ? this.indexPlayerTurn + 1 : 0

            this.inputPlayersForExtraScore.forEach(index => {
                this.animateNumber(this.listPlayers[index], (this.listPlayers[index].totalScore + this.inputScore / 2))
                this.listPlayers[index].stringScore = this.listPlayers[index].stringScore ? this.listPlayers[index].stringScore + `, ${this.inputScore / 2}` : `${this.inputScore / 2}`
            })
            
            this.inputScore = ''
            if (this.inputPlayersForExtraScore.length){
                this.inputPlayersForExtraScore.splice(0, this.inputPlayersForExtraScore.length)
            }
        },
        animateNumber(currentPlayer, newScore) {
            gsap.to(currentPlayer,  {
                totalScore: newScore,
                duration: 0.5, 
                onUpdate: () => {
                    currentPlayer.totalScore = Number(currentPlayer.totalScore.toFixed(0))
                }
            })
        }
    },
    watch: {
        inputScore(value) {
            console.log(value)
            if (!value || value < 4) {
                this.isDisabledExtraScore = true
                this.inputPlayersForExtraScore.splice(0, this.inputPlayersForExtraScore.length)
            }
            else {
                this.isDisabledExtraScore = false
            }
        },
    }
}

Vue.createApp(App).mount("#app")