//cell class
export class Cell {
    constructor(row, cell){
        this.id = 'r' + row + ':' + 'c' + cell; //id for keys
        this.row = row; //row number
        this.cell = cell; //cell number
        this.color = null; //current cell color , red or blue , by this we know the player also (the hover color is not stores here only in the view jsx)
    }
    //method to set color get blue or red
    setColor(color) {   
        if (color === 'blue' || color === 'red')
            this.color = color;
        else 
            alert('error inside data: cell.setColor - color in not red or blue')
    }

}
//a class that represents a row inside the board
export class Row {
    constructor(row){
        this.id = 'r' + row; //id for keys
        this.row = row; //row number inside board
        this.cells = new Array(); //array of the cells
    }
    //add new cell to the array
    push(cell) {
        this.cells.push(cell);
    }
}

//the main board data
export default class Board {
    constructor(){
        this.rows = new Array(); // the rows inside the board, each row has 7 cells
        //fill 6 rows with 7 cells
        for(let r = 0; r < 6; r ++){
            let row = new Row(r);
            for(let c = 0 ; c < 7 ; c ++){
                let cell = new Cell(r,c);
                row.push(cell);
            }
            this.rows.push(row);
        }
    }

    // plays a turn 
    // THIS SHOULD BE USED ONLY IF THERE IS AN EMPTY COLUMN
    // fills it (the one that is the most lowest)
    play(color ,cell){
        //check if there is an empty colmn and if not throws an error
        if(!this.isThereACellEmptyOnThisColumn(cell))
            throw new Error("There is no empty cell in this column...");

        //get last empty cell
        const column = this.getColumnOfCell(cell);
        const emptyCellsOfColumn = column.filter(c => c.color === null);
        const lenghtOfArray = emptyCellsOfColumn.length;
        const lastEmptyCell = emptyCellsOfColumn[lenghtOfArray - 1];

        //change the color
        lastEmptyCell.color = color;
    }

    //checks if can play on this column
    isThereACellEmptyOnThisColumn(cell){
        const column = this.getColumnOfCell(cell);
        const emptyCellsOfColumn = column.filter(c => c.color === null);
        if(emptyCellsOfColumn.length == 0)
            return false; //the cell is empty
        return true;
    }

    // Gets a cell class and retuns an array with all the cells in the column
    getColumnOfCell(cellIndex){
        const column = [];
        for(let i = 0 ; i < 6 ; i++){
            column.push(this.rows[i].cells[cellIndex]);
        }
        return column;
    }

}