import Alg from "../Alg"
import { CellType } from "../../grid/CellTypes";

export class Pathfind extends Alg {
    constructor(grid) {
        super(grid, true);
        
        this.grid.start.isNext = true;
    }

    step(cell) {
        super.step();

        this.setCurrCell(cell);
        this.setVisited(cell);
    }

    updateNextCell(child, parent) {
        child.isNext = true;
        this.setParent(child, parent);
    }

    isEnd(cell) { return cell.type === CellType.END; } 

    isWalkableLink(fromCell, toCell, dir) {
        return (toCell &&
                fromCell.links.includes(dir) && 
                !this.isNext(toCell) && 
                !this.isVisited(toCell) && 
                toCell.type !== CellType.START);
    }

    setVisited(cell) {
        if(this.isNext(cell) && !this.isVisited(cell)) {
            cell.visited = true;
            this.visitedCount++;
        }

        if(cell.type === CellType.GENERATION) { 
            cell.type = CellType.VISITED; 
        }
    }

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