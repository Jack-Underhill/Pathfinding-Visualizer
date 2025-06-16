export class Cell {
    constructor(row, col, type = "empty") {
        this.row = row
        this.col = col
        this.type = type
        this.visited = false
        this.parent = null
        this.links = []
    }

    reset() {
        this.visited = false
        this.parent = null
        if(this.type !== "wall" && this.type !== "start" && this.type != "end") {
            this.type = "empty"
        }
    }
}

export default new Cell;