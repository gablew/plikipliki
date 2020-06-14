class Game {

    constructor() {

        this.poles = document.querySelectorAll('.pole');
        this.poles.forEach(pole => {
            pole.addEventListener('click', this.handlepoleClick.bind(this))
        })
    }

    handlepoleClick(event) {

        const index = event.target.id;

        if (!this.board[index]) {
            this.setpoleValue(index, this.actual);
            this.renderBoard();
            this.changePlayer();

            if (this.checkWin()) {
                alert('Gratuluję wygrywa gracz: ' + this.winner +  ' dziękuję za wspólna grę');
                this.initGame();
            }
            else if (this.checkFullBoard()) {
                alert('Remis');
                this.initGame();
            }
        }
        else {
            alert('Pole jest już zajęte, wybierz inne.');
        }

    }

    checkFullBoard() {
        return this.board.indexOf('') === -1;
    }

    setpoleValue(index, value) {
        this.board[index] = value;
    }

    changePlayer() {
        this.actual = this.actual === 'O' ? 'X' : 'O';
    }

    initGame() {

        this.actual = this.randomPlayer();
        this.winner = null;
        this.board = new Array(9).fill('');

        this.renderBoard();
    }
    randomPlayer() {
        return Math.floor(Math.random() * 10) % 2 ? 'X' : 'O';
    }
    renderBoard() {
        this.poles.forEach((pole, index) => {
            pole.innerText = this.board[index];
        })
    }
    checkWin() {
        const board = this.board;
        //Poziomy
        for (let i = 0; i < 3; i++) {
            if (this.check3equals(board[i * 3], board[i * 3 + 1], board[i * 3 + 2])) {
                this.winner = board[i * 3];
                return true;
            }
        }
        //Pionowy
        for (let i = 0; i < 3; i++) {
            if (this.check3equals(board[i], board[i + 3], board[i + 6])) {
                this.winner = board[i];
                return true;
            }
        }
        //przekatny
        if (this.check3equals(board[0], board[4], board[8])) {
            this.winner = board[0];
            return true;
        }

        if (this.check3equals(board[2], board[4], board[6])) {
            this.winner = board[2];
            return true;
        }
		
    }
    check3equals(a, b, c) {
        return !!a && a === b && b === c && a === c;
    }
}
window.addEventListener('load', () => {

    const game = new Game();

    game.initGame();
})
$(document).ready(function(){
    setInterval(function(){

        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var seconds = currentTime.getSeconds();

        minutes = (minutes < 10 ? "0" : "") + minutes;
        seconds = (seconds < 10 ? "0" : "") + seconds;
        hours = (hours < 10 ? "0" : "") + hours;

        var currentTimeString = hours + ":" + minutes + ":" + seconds;
        $("#clock").html(currentTimeString);

    },100);
});
