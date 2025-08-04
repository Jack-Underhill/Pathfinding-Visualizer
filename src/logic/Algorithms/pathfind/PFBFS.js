import Pathfind from './Pathfind';

export class PFBFS extends Pathfind {
    constructor(grid) {
        super(grid);

        this.q = [];
        this.q.push(this.grid.start);
    }

    static id = "Breadth First Search";
    getName() { return PFBFS.id }

    step() {
        const currCell = this.q.shift();
        super.step(currCell);

        if(this.isEnd(currCell)) {
            this.finalize();
            return;
        }

        this.addNextCells(currCell);

        // Fail Case: Expanded as far as it could but did not find the end.
        if(this.q.length <= 0) {
            this.done = true;
            this.grid.isEditable = true;
        }
    }

    addNextCells(currCell) {
        for(let dir of this.getDirectionList()) {
            const nextCell = this.getNeighborCell(dir);

            if(this.isWalkableLink(currCell, nextCell, dir)) {
                this.updateNextCell(nextCell, currCell);
                this.q.push(nextCell);
            }
        }
    }
}