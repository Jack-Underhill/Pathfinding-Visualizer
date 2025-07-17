import Alg from "../Alg"
import { CellType } from "../../grid/CellTypes";

export class Pathfind extends Alg {
    constructor(grid) {
        super(grid, true);
        
        this.grid.start.isNext = true;
    }

    step(cell) {
        super.step();
        this.setVisited(cell);
        this.row = cell.row;
        this.col = cell.col;
    }

    updateNextCell(child, parent) {
        child.isNext = true;
        this.setParent(child, parent);
    }

    isEnd(cell) { return cell.type === CellType.END; } 

    setVisited(cell) {
        if(this.isNext(cell) && !this.isVisited(cell)) {
            cell.visited = true;
            this.visitedCount++;
        }

        if(cell.type === CellType.GENERATION) { 
            cell.type = CellType.VISITED; 
        }
    }

    setParent(child, parent) { child.parent = parent; }

    setPath() {
        let cell = this.grid.end;
        while(cell.parent)
        {
            this.pathCount++;

            if(cell.type != CellType.START && cell.type != CellType.END)
            {
                cell.type = CellType.PATH;
            }

            cell = cell.parent;
        }
    }

    finalize() {
        this.setVisited(this.getCurrCell());
        this.setPath();
        this.finalizeAlg();
    }
}

export default Pathfind;