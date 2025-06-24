import Alg from "../Alg"

export class PFBFS extends Alg {
    constructor(grid) {
        super(grid, true);
        this.initBFS();
    }

    initBFS() {
        this.q = [];
        this.q.push(this.grid.start);
        this.setVisited(this.grid.start);
        this.visitedCount--;
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
            
            this.finalizePFStep(newCell);
        }
        
        return this.done;
    }

    runInstant() 
    {
        this.grid.resetPF();
        this.initStats();
        this.done = false;

        this.initBFS();

        while(!this.isDone()) {
            this.step();
        }
    }
}