import { CellType } from "../../grid/CellTypes";

import Generator from './Generator';

export class GridOpen extends Generator {
    constructor(grid) {
        super(grid);
        grid.isOpen = true;
    }
    
    static id = "Open Grid";
    getName() { return GridOpen.id }

    step() {
        super.step();
        
        const cell = this.getCurrCell();
        
        if(cell) {
            cell.type = CellType.GENERATION;
            this.setLinks(cell);

            if(this.row < this.grid.rows - 1)
            {
                this.row++;
            }
            else if(this.col < this.grid.cols - 1) {
                this.row = 0;
                this.col++;
            }
            else {
                this.finalize();
            }
        }
        else {
            this.finalize();
        }
    }

    setLinks(cell) {
        let row = cell.row;
        let col = cell.col;

        if(this.isBounded(row - 1, col)) { cell.links.push(0); }
        if(this.isBounded(row, col - 1)) { cell.links.push(1); }
        if(this.isBounded(row + 1, col)) { cell.links.push(2); }
        if(this.isBounded(row, col + 1)) { cell.links.push(3); }
    }
}