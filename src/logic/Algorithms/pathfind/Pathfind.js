import Alg from "../Alg"

export class Pathfind extends Alg {
    constructor(grid) {
        super(grid, true);
        this.initPF();
    }

    isEnd(cell) { return cell.type === CellType.END; } 

    finalize() {
        this.setPath();
        this.finalizeAlg();
        this.runTime += performance.now() - this.startTime;
    }
}