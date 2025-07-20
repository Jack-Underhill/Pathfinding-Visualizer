import Pathfind from './Pathfind';

export class PFDFS extends Pathfind {
    constructor(grid) {
        super(grid);

        this.setCurrCell(this.grid.start);
    }

    static id = "Depth First Search";
    getName() { return PFDFS.id }

    step() {
        let currCell = this.getCurrCell();
        super.step(currCell);

        if(this.isEnd(currCell)) {
            this.finalize();
            return;
        }

        const nextCell = this.getWalkedCell(currCell);
        if(nextCell !== null) {
            this.setCurrCell(nextCell);
            this.updateNextCell(nextCell, currCell);
        } else if(currCell.parent) { 
            // Backtrack
            this.setCurrCell(currCell.parent);
            this.step();
            return;
        } else {
            // Fail Case: Expanded as far as it could and backtracked to start.
            this.done = true;
            return;
        }
    }

    getWalkedCell(currCell) {
        for(let dir of this.getDirectionList()) {
            const nextCell = this.getNeighborCell(dir);

            if(this.isWalkableLink(currCell, nextCell, dir)) {
                return nextCell;
            }
        }

        return null;
    }
}