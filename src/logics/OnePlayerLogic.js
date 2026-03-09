import Board from '@/model/board.js';
import Status from '@/model/status.js';
import TwoPlayersLogic from './TwoPlayersLogic';
import BotLogic from './BotLogic';

export default class OnePlayerLogic extends TwoPlayersLogic {
  constructor() {
    super();        // חובה
    this.restart(); // כעת מותר להשתמש ב-this
  }

  // override example – רק אם אתה באמת רוצה להרחיב
  play(cell) {
    super.play(cell);
  }

  playForBot(){
    //TODO MAKE BOT THINKING
    
    //BOT MOVE
    const chosenCellForBot = BotLogic.chooseColumn(this.board);
    super.play(chosenCellForBot);
  }
}
