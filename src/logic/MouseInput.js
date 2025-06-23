import { CellType } from "./grid/CellTypes"

export class MouseInput 
{
    constructor(grid) 
    {
        this.setGrid(grid);
        this.initMouseHandling();
    }

    initMouseHandling() 
    {
        this.isDragging = false;
        this.currDragged = null;
    }

    setGrid(grid)
    {
        this.grid = grid;
    }

    down(row, col)
    {
        const cell = this.grid.getCell(row, col);

        if(this.grid.isEditable && 
           (cell.type === CellType.START || 
           cell.type === CellType.END ||
           cell.type === CellType.CHECKPOINT))
        {
            this.grid.resetPF();
            this.isDragging = true;
            this.currDragged = cell;
        }
    }

    move(row, col)
    {
        if(this.isDragging) {
            let overlapCell = this.grid.getCell(row, col);

            if(overlapCell !== this.currDragged) 
            {
                let tempType = overlapCell.type;
                overlapCell.type = this.currDragged.type;
                this.currDragged.type = tempType;

                // Only sets if cell's type matches
                this.grid.setStart(this.currDragged);
                this.grid.setStart(overlapCell);
                this.grid.setEnd(this.currDragged);
                this.grid.setEnd(overlapCell);

                this.currDragged = overlapCell;
                return true;
            }
        }

        return false;
    }

    up()
    {
        this.initMouseHandling();
    }
}