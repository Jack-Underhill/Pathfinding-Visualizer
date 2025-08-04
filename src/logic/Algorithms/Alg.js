import { CellType } from "../grid/CellTypes";
import { Direction } from '../grid/Direction'

export class Alg
{
    constructor(grid, isSearchable) {
        this.grid = grid;
        this.done = false;
        this.setCurrCellPosition(0, 0);

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

    isBehaviorType(cell) {
        return cell.type === CellType.START ||
               cell.type === CellType.END ||
               cell.type === CellType.CHECKPOINT ||
               cell.type === CellType.WALL;
    }

    isBounded(r, c) {
        return (r >= 0 && r < this.grid.rows &&
                c >= 0 && c < this.grid.cols)
    }

    getCurrCell() {
        return this.grid.getCell(this.row, this.col);
    }

    getLinkDirection(fromCell, toCell) {
        if(fromCell.row > toCell.row) return Direction.UP;
        if(fromCell.row < toCell.row) return Direction.DOWN;
        if(fromCell.col > toCell.col) return Direction.LEFT;
        if(fromCell.col < toCell.col) return Direction.RIGHT;

        throw new Error("Cells are not neighbors");
    }

    getNeighborPosition(cell, direction) {
        let r, c;

        switch (direction) {
            case Direction.UP:
                r = cell.row - 1;
                c = cell.col;
                break;
            case Direction.LEFT:
                r = cell.row;
                c = cell.col - 1;
                break;
            case Direction.DOWN:
                r = cell.row + 1;
                c = cell.col;
                break;
            case Direction.RIGHT:
                r = cell.row;
                c = cell.col + 1;
                break;
        
            default:
                r = null;
                c = null;
                break;
        }

        return { r, c };
    }

    getNeighborCell(direction) {
        const { r, c } = this.getNeighborPosition(this.getCurrCell(), direction);

        if(r !== null && c !== null && this.isBounded(r, c)) {
            return this.grid.getCell(r, c);
        } else {
            return null;
        }
    }

    getDirectionList() {
        return [Direction.UP, Direction.LEFT, Direction.DOWN, Direction.RIGHT];
    }

    setCurrCell(cell) {
        this.row = cell.row;
        this.col = cell.col;
    }

    setCurrCellPosition(r, c) {
        this.row = r;
        this.col = c;
    }

    setParent(child, parent) { child.parent = parent; }

    shuffle(arr) {
        for(let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        return arr;
    }

    finalizeAlg() {
        this.done = true;
        this.grid.isEditable = true;
        this.runtime += performance.now() - this.startTime;
    }
}

export default Alg;