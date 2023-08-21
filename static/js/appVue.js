const App = {
    data() {
        return {
            inputNameDisabled: false,
            listPlayers: [],
            inputNameValue: ''
        }
    },
    methods: {
        inputNameChangeHandler(event) {
            this.inputNameValue = event.target.value
        },
        addNewPlayer() {
            this.listPlayers.push(this.inputNameValue)
            this.inputNameValue = ''
        },
        inputNameKeyPress(event) {
            if (event.key === 'Enter') {
                this.addNewPlayer()
            }
        }
    }
}

Vue.createApp(App).mount("#app")