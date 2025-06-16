import Cell from "./Cell"

export class Grid 
{
    constructor(rows, cols) 
    {
        this.rows = rows
        this.cols = cols
        this.grid = this._createGrid
    }

    _createGrid() 
    {
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

    resetGrid() 
    {
        for(let row of this.grid) 
        {
            for(let cell of row) 
            {
                cell.reset()
            }
        }
    }
}