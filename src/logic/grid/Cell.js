import { CellType } from "./CellTypes"

export default class Cell {
    constructor(row, col, type = CellType.EMPTY) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.visited = false;
        this.isNext = false;
        this.parent = null;
        this.links = [];
    }

    reset() {
        this.type = CellType.EMPTY;
        this.visited = false;
        this.isNext = false;
        this.parent = null;
        this.links = [];
    }

    clear() {
        this.visited = false;
        this.isNext = false;
        this.parent = null;
        if(this.type !== CellType.WALL && this.type !== CellType.START && this.type != CellType.END) {
            this.type = CellType.GENERATION;
        }
    }

    clone() {
        const newCell = new Cell(this.row, this.col);

        newCell.type = this.type;
        newCell.visited = this.visited;
        newCell.isNext = this.isNext;
        newCell.parent = this.parent;

        // Shallow primitive copy
        newCell.links = [...this.links];

        return newCell;
    }
}