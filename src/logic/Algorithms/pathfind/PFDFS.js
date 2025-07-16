import Pathfind from './Pathfind';

export class PFDFS extends Pathfind {
    constructor(grid) {
        super(grid);

        this.row = this.grid.start.row;
        this.col = this.grid.start.col;
    }

    static id = "Depth First Search";
    getName() { return PFDFS.id }

    step() {
        let cell = this.getCurrCell();
        super.step(cell);

        if(this.isEnd(cell)) this.finalize();
        
        if(this.isWalkable(0)) {
            this.row--;
            this.updateNextCell(this.getCurrCell(), cell);
        } else if(this.isWalkable(1)) {
            this.col--;
            this.updateNextCell(this.getCurrCell(), cell);
        } else if(this.isWalkable(2)) {
            this.row++;
            this.updateNextCell(this.getCurrCell(), cell);
        } else if(this.isWalkable(3)) {
            this.col++;
            this.updateNextCell(this.getCurrCell(), cell);
        } else if(cell.parent) { 
            // Backtrack
            this.row = cell.parent.row;
            this.col = cell.parent.col;
            this.step();
            return;
        } else {
            this.done = true;
            return;
        }
    }
}