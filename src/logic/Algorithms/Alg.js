import { CellType } from "../grid/CellTypes";

export class Alg
{
    constructor(grid) {
        this.grid = grid;
        this.done = false;
        this.row = 0;
        this.col = 0;
    }

    isDone() { return this.done; }
    isVisited(cell) { return cell.visited; }

    isBounded(r, c) {
        return (r >= 0 && r < this.grid.rows &&
                c >= 0 && c < this.grid.cols)
    }

    isWalkable(direction) {
        const prevCell = this.getCurrCell();
        const currCell = this.getNeighborCell(direction);

        return (currCell &&
                prevCell.links.includes(direction) && 
                !this.isVisited(currCell) && 
                currCell.type !== CellType.START);
    }

    getCurrCell() {
        return this.grid.getCell(this.row, this.col);
    }

    getDirection(child, parent) {
        if(child.row < parent.row) {
            return 0;
        } else if(child.col < parent.col) {
            return 1;
        } else if(child.row > parent.row) {
            return 2;
        } else if(child.col > parent.col) {
            return 3;
        }
    }

    getNeighborCell(direction) {
        let r, c;

        if(direction === 0) {
            r = this.row - 1;
            c = this.col;
        } else if(direction === 1) {
            r = this.row;
            c = this.col - 1;
        } else if(direction === 2) {
            r = this.row + 1;
            c = this.col;
        } else if(direction === 3) {
            r = this.row;
            c = this.col + 1;
        } else {
            return null;
        }

        if(this.isBounded(r, c)) {
            return this.grid.getCell(r, c);
        } else {
            return null;
        }
    }

    getRandCell() {
        const randRow = Math.floor(Math.random() * this.grid.rows);
        const randCol = Math.floor(Math.random() * this.grid.cols);

        return this.grid.getCell(randRow, randCol);
    }

    setTypeToRandomCell(type)
    {
        let cell = this.getRandCell();
        
        // Finds cell that is not already start or end
        while(cell.type === CellType.START || cell.type === CellType.END) {
            cell = this.getRandCell();
        }

        cell.type = type;

        if(type === CellType.START)
        {
            this.grid.start = cell;
            this.row = cell.row;
            this.col = cell.col;
        }
        else if(type === CellType.END)
            this.grid.end = cell;
    }

    setPath() {
        let cell = this.grid.end;
        while(cell.parent)
        {
            if(cell.type != CellType.START && cell.type != CellType.END)
            {
                cell.type = CellType.PATH;
            }

            cell = cell.parent;
        }
    }

    setVisited(cell) {
        cell.visited = true;

        if(cell.type === CellType.GENERATION)
        {
            cell.type = CellType.VISITED;
        }
    }

    finalizeGrid() {
        this.done = true;
        if(!this.grid.start) this.setTypeToRandomCell(CellType.START);
        if(!this.grid.end) this.setTypeToRandomCell(CellType.END);
    }

    finalizePFStep(prevCell) {
        const newCell = this.getCurrCell();
        newCell.parent = prevCell;

        if(newCell.type === CellType.END) {
            this.setPath();
            this.done = true;
        }
    }
}

export default Alg;