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
        if(child.type === CellType.GENERATION) { 
            child.type = CellType.NEXT; 
        }

        this.setParent(child, parent);
    }

    isEnd(cell) { return cell.type === CellType.END; } 

    isLinked(fromCell, toCell, dir) { 
        return (toCell && 
                fromCell.links.includes(dir) && 
                toCell.type !== CellType.START); 
    }

    isWalkableLink(fromCell, toCell, dir) {
        return (this.isLinked(fromCell, toCell, dir) && 
                !this.isNext(toCell) && 
                !this.isVisited(toCell));
    }

    setVisited(cell) {
        if(this.isNext(cell) && !this.isVisited(cell)) {
            cell.visited = true;
            cell.isNext = false;
            this.visitedCount++;
        }

        if(cell.type === CellType.GENERATION || cell.type === CellType.NEXT) { 
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

        this.pathCount++;
    }

    finalize() {
        this.setVisited(this.getCurrCell());
        this.setPath();
        this.finalizeAlg();
    }
}

export default Pathfind;