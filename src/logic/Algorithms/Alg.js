import { CellType } from "../grid/CellTypes";

export class Alg
{
    constructor(grid, isSearchable) {
        this.grid = grid;
        this.done = false;
        this.row = 0;
        this.col = 0;

        // isSearchable: Pathfinder has been initialized
        this.isSearchable = isSearchable;

        // isEditable: Grid has been generated
        this.grid.isEditable = false;

        this.initStats();
    }

    print() { console.log(this); }

    step() {
        this.stepCount++;
    }

    runInstant()
    {
        while(!this.isDone()) {
            this.step();
        }
    }

    initStats() {
        this.visitedCount = 0;
        this.pathCount = 0;
        this.stepCount = 0;
        this.runtime = 0;
        this.startTime = performance.now();
    }

    isDone() { return this.done; }
    isVisited(cell) { return cell.visited; }
    isNext(cell) { return cell.isNext; }

    isBounded(r, c) {
        return (r >= 0 && r < this.grid.rows &&
                c >= 0 && c < this.grid.cols)
    }

    isWalkable(direction) {
        const prevCell = this.getCurrCell();
        const currCell = this.getNeighborCell(direction);

        return (currCell &&
                prevCell.links.includes(direction) && 
                !this.isNext(currCell) && 
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

    finalizeAlg() {
        this.done = true;
        this.grid.isEditable = true;
        this.runtime += performance.now() - this.startTime;
    }
}

export default Alg;