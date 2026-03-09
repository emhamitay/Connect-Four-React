const BotLogic = {
  // Method to choose a column for the bot's move
  chooseColumn(board) {
    // Implement your bot's logic to choose a column
    // For simplicity, let's just return the first empty column
    const options = [];
    for (let cell = 0; cell < 7; cell++) {
      if (board.isThereACellEmptyOnThisColumn(cell)) {
        options.push(cell);
      }
    }

    //choose one of the cells
    const chosenColumn = options[Math.floor(Math.random() * options.length)];
    if (chosenColumn !== undefined) {
      return chosenColumn; // Return the chosen column
    }
    console.log("No valid columns available for the bot.");
    return null; // No valid moves available
  },
};
export default BotLogic;