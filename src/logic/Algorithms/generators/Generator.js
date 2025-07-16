import Alg from "../Alg"

export class Generator extends Alg {
    constructor(grid) {
        super(grid, false);
    }

    finalize() {
        this.finalizeAlg();
        if(!this.grid.start) this.setTypeToRandomCell(CellType.START);
        if(!this.grid.end) this.setTypeToRandomCell(CellType.END);
    }
}