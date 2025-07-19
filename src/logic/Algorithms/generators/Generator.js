import Alg from "../Alg"
import { CellType } from "../../grid/CellTypes";

export class Generator extends Alg {
    constructor(grid) {
        super(grid, false);
    }

    step() {
        super.step();
    }

    getRandGridCell() {
        const randRow = Math.floor(Math.random() * this.grid.rows);
        const randCol = Math.floor(Math.random() * this.grid.cols);

        return this.grid.getCell(randRow, randCol);
    }

    setTypeToRandomCell(type)
    {
        let cell = this.getRandGridCell();
        
        // Finds cell that is not already start or end
        while(cell.type === CellType.START || cell.type === CellType.END) {
            cell = this.getRandGridCell();
        }

        cell.type = type;

        if(type === CellType.START)
        {
            this.grid.start = cell;
            this.setCurrCell(cell);
        }
        else if(type === CellType.END)
            this.grid.end = cell;
    }

    setTypeGeneration(cell) {
        if(cell.type === CellType.EMPTY) {
            cell.type = CellType.GENERATION; 
        }
    }

    linkCells(cell1, cell2) {
        const dir1to2 = this.getDirectionLink(cell1, cell2);
        const dir2to1 = this.getDirectionLink(cell2, cell1);

        if(!cell1.links.includes(dir1to2)) cell1.links.push(dir1to2);
        if(!cell2.links.includes(dir2to1)) cell2.links.push(dir2to1);
    }

    finalize() {
        this.finalizeAlg();

        if(!this.grid.start) this.setTypeToRandomCell(CellType.START);
        if(!this.grid.end) this.setTypeToRandomCell(CellType.END);
    }
}

export default Generator;