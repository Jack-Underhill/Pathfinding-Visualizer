import Alg from "../Alg"

export class PFDFS extends Alg {
    constructor(grid) {
        super(grid, true);
        this.initDFS();
    }

    initDFS() {
        this.row = this.grid.start.row;
        this.col = this.grid.start.col;
    }

    step() {
        let cell = this.getCurrCell();
        this.setVisited(cell);
        
        if(this.isWalkable(0)) {
            this.row--;
        }
        else if(this.isWalkable(1)) {
            this.col--;
        }
        else if(this.isWalkable(2)) {
            this.row++;
        }
        else if(this.isWalkable(3)) {
            this.col++;
        }
        else if(cell.parent) {
            this.row = cell.parent.row;
            this.col = cell.parent.col;
            this.step();
            return;
        }
        else {
            this.done = true;
            return;
        }

        const newCell = this.getCurrCell();
        newCell.parent = cell;

        this.finalizePFStep(newCell);
    }

    runInstant() 
    {
        this.grid.resetPF();
        this.initStats();
        this.done = false;

        this.initDFS();

        while(!this.isDone()) {
            this.step();
        }
    }
}