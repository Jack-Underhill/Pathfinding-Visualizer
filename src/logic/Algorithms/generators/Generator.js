import Alg from "../Alg"
import { CellType } from "../../grid/CellTypes";

export class Generator extends Alg {
    constructor(grid) {
        super(grid, false);
    }
    
    step() {
        super.step();
    }

    getRandCell() {
        const randRow = Math.floor(Math.random() * this.grid.rows);
        const randCol = Math.floor(Math.random() * this.grid.cols);

        return this.grid.getCell(randRow, randCol);
    }

    setTypeToRandomCell(type)
    {
        let cell = this.getRandCell();
        
        // Finds cell that is not already start or end
        while(cell.type === CellType.START || cell.type === CellType.END) {
            cell = this.getRandCell();
        }

        cell.type = type;

        if(type === CellType.START)
        {
            this.grid.start = cell;
            this.row = cell.row;
            this.col = cell.col;
        }
        else if(type === CellType.END)
            this.grid.end = cell;
    }

    finalize() {
        this.finalizeAlg();

        if(!this.grid.start) this.setTypeToRandomCell(CellType.START);
        if(!this.grid.end) this.setTypeToRandomCell(CellType.END);
    }
}

export default Generator;