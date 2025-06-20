import Alg from "../Alg"
import { CellType } from "../../grid/CellTypes";

export class PFBFS extends Alg {
    constructor(grid) {
        super(grid);
        this.q = [];
        this.q.push(grid.start);
        this.setVisited(grid.start);
    }

    step() {
        let cell = this.q.shift();
        this.row = cell.row;
        this.col = cell.col;

        if(this.qPush(0)) return;
        if(this.qPush(1)) return;
        if(this.qPush(2)) return;
        if(this.qPush(3)) return;

        if(this.q.length <= 0) {
            this.done = true;
        }
    }

    // Pushes cell if walkable. 
    // Returns true if the push was the end.
    qPush(direction) {
        if(this.isWalkable(direction)) {
            let newCell = this.getNeighborCell(direction);
            this.q.push(newCell);
            this.setVisited(newCell);
    
            newCell.parent = this.getCurrCell();
            
            if(newCell.type === CellType.END) {
                this.setPath();
                this.done = true;
            }
        }
        
        return this.done;
    }
}