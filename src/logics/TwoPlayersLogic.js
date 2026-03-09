import Board from '@/model/board.js';
import Status from '@/model/status.js';
import { GetWinner, WINNER } from './LogicUtil.js'

//Default GameLogic class
//Should be extended to HumenLogic or BotLogic or MpLogic or HLogic
export default class TwoPlayersLogic {
  constructor() {
    this.restart();
  }

  // this function is used to change the current player color and send a callback if there is
  changePlayer(callback = null) {
    //change the player
    this.currentPlayer = this.currentPlayer === "red" ? "blue" : "red";
    if (callback) {
      callback(this.currentPlayer);
    }
  }

  // this functions runs the a cell was clicked - it runs inside CELL feature
  // gets color and cell index to player of the chosen cell
  play(cell) {
    //throw in currently not playing
    if (this.status != Status.PLAYING) return;

    //check if cell is empty and run
    if (this.board.isThereACellEmptyOnThisColumn(cell)) {
      this.board.play(this.currentPlayer, cell);
    } else {
      console.log("cell is not empty");
    }
  }

  // this function checks for a winner and changes the game status
  checkForWinner() {
    //check if there is a winner
    const winner = GetWinner(this.board);
    if (winner !== WINNER.NONE) {
      this.status = Status.FINISHED;
      this.winner = winner; // set the winner
    }
  }

  //this function restart the game
  restart() {
    this.currentPlayer = "red"; // default player
    this.board = new Board(); // new board
    this.status = Status.PLAYING; // default game status
    this.winner = WINNER.NONE; // default winner
  }
}