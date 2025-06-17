export class Alg
{
    constructor(grid) {
        this.grid = grid;
        this.done = false;
        this.row = 0;
        this.col = 0;
    }

    step() {}
    isDone() { return this.done; }
}

export default Alg;