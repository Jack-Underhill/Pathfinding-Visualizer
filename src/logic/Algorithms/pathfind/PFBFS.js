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
        let cell = this.q.shift();
        super.step(cell);
        
        if(this.isEnd(cell)) this.finalize();

        this.qPush(0);
        this.qPush(1);
        this.qPush(2);
        this.qPush(3);

        // Fail Case: Expanded as far as it could but did not find the end.
        if(this.q.length <= 0) {
            this.done = true;
        }
    }

    qPush(direction) {
        if(this.isWalkable(direction)) {
            let newCell = this.getNeighborCell(direction);
            this.updateNextCell(newCell, this.getCurrCell());
            this.q.push(newCell);
        }
    }
}