const Status = {
    PLAYING: "playing",
    FINISHED: "finished",
    WAITING_FOR_RED: 'waiting_for_red',
    WAITING_FOR_BLUE: 'waiting_for_blue',
    WAITING_FOR_BOT: "waiting_for_bot",
    DRAW: 'draw',
    HISTORY_MODE: 'history_mode',
    _WINNER: null, // this is used to store the winner when the game is finished
    setWinner(winner) {
        this._WINNER = winner;
    },
    getWinner() {
        return this._WINNER;
    },
    getWinnerStatement(string = "The winner is: ") {
        if (this._WINNER) {
            return `${string} ${this._WINNER}`;
        }
        return "No winner yet.";
    }
};

export default Status;