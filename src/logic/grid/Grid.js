import Cell from "./Cell"
import { CellType } from "./CellTypes";

export class Grid 
{
    constructor(rows, cols) 
    {
        this.resetGrid(rows, cols);
    }

    _createGrid(rows, cols) 
    {
        this.rows = rows
        this.cols = cols
        this.start = null
        this.end = null
        this.isOpen = false;
        this.isEditable = false;

        const grid = []

        for(let r = 0; r < this.rows; r++) 
        {
            const row = []

            for(let c = 0; c < this.cols; c++) 
            {
                row.push(new Cell(r, c))
            }

            grid.push(row)
        }

        return grid
    }

    getCell(row, col)
    {
        if(row >= 0 && row < this.rows &&
           col >= 0 && col < this.cols)
        {
            return this.grid[row][col]
        }
        else
        {
            return null
        }
    }

    setStart(cell) {
        if(cell.type === CellType.START)
            this.start = cell;
    }

    setEnd(cell) {
        if(cell.type === CellType.END)
            this.end = cell;
    }

    resetGrid(rows, cols) 
    {
        this.grid = this._createGrid(rows, cols);
    }

    resetPF()
    {
        for(let row of this.grid) 
        {
            for(let cell of row) 
            {
                cell.clear();
            }
        }
    }
}