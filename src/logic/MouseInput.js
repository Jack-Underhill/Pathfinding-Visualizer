import { CellType } from "./grid/CellTypes"

export class MouseInput 
{
    constructor(gridRef) 
    {
        this.gridRef = gridRef;
        this.initMouseHandling();
    }

    initMouseHandling() 
    {
        this.isDragging = false;
        this.currDragged = null;
    }

    down(row, col)
    {
        const cell = this.gridRef.current.getCell(row, col);

        if(this.gridRef.current.isEditable && 
           (cell.type === CellType.START || 
           cell.type === CellType.END ||
           cell.type === CellType.CHECKPOINT))
        {
            this.gridRef.current.resetForPF();
            this.isDragging = true;
            this.currDragged = cell;
        }
    }

    move(row, col)
    {
        if(this.isDragging) {
            let overlapCell = this.gridRef.current.getCell(row, col);

            if(row !== this.currDragged.row || col !== this.currDragged.col) 
            {
                let tempType = overlapCell.type;
                overlapCell.type = this.currDragged.type;
                this.currDragged.type = tempType;

                // Only sets if cell's type matches
                this.gridRef.current.setStart(this.currDragged);
                this.gridRef.current.setStart(overlapCell);
                this.gridRef.current.setEnd(this.currDragged);
                this.gridRef.current.setEnd(overlapCell);

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