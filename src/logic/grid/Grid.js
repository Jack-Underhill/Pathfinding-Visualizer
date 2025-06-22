import Cell from "./Cell"
import { CellType } from "./CellTypes"

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
        this.initMouseHandling();

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

    initMouseHandling() 
    {
        this.isDragging = false;
        this.currDragged = null;
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
                cell.clear()
            }
        }
    }

    handleMouseDown(row, col)
    {
        const cell = this.getCell(row, col);

        if(cell.type === CellType.START || 
           cell.type === CellType.END ||
           cell.type === CellType.CHECKPOINT) 
        {
            this.resetPF();
            this.isDragging = true;
            this.currDragged = cell;
        }
    }

    handleMouseMove(row, col)
    {
        if(this.isDragging) {
            const cell = this.getCell(row, col);

            if(cell !== this.currDragged &&
               cell.type === CellType.GENERATION) 
            {
                cell.type = this.currDragged.type;
                this.currDragged.type = CellType.GENERATION;
                this.currDragged = cell;

                if(this.currDragged.type === CellType.START)
                {
                    this.start = this.currDragged;
                }
                else if(this.currDragged.type === CellType.END)
                {
                    this.end = this.currDragged;
                }

                return true;
            }
        }

        return false;
    }

    handleMouseUp()
    {
        this.initMouseHandling();
    }
}