import Status from '@/model/status'

// this is the controller between the TwoPlayerLogic and the UI
// it uses valtio and react to manage the game state
// it uses valtio to manage the game state
export function TwoPlayersController(state ,history) {
    // this functions runs the a cell was clicked - it runs inside CELL feature
    // gets row index and cell index of the chosen cell
    function play(cell) {
        //play
        state.gameLogic.play(cell);
        //change the current player
        state.gameLogic.changePlayer();
        //check for a winner
        state.gameLogic.checkForWinner();
        //add to move to history object
        history.current.push(cell);

        //if there is a winner set the covered column to none
        if(state.gameLogic.status == Status.FINISHED) state.currentlyHoveredColumn = null;
    }
    
    //this function changes the color of the hovered cells
    function handleHover(cell) {
        //if game ended dont let hover animation
        if(state.gameLogic.status == Status.FINISHED) return;

        //set the hover
        state.currentlyHoveredColumn = cell;
    }
    
    //this function changes the color of the un-hovered cells
    function handleUnHover() {
        state.currentlyHoveredColumn = null;
    }
    
    //this function restart the game
    function restart() {
        state.gameLogic.restart();
        state.gameLogic.currentlyHoveredColumn = null; // Reset the hovered column
        history.current = []; //restart the history
    }
    
    return [
        play,
        handleHover,
        handleUnHover,
        restart
    ];
}