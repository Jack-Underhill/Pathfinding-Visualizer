import { CellType } from "../../grid/CellTypes";
import Alg from "../Alg"

export class GridOpen extends Alg {
    constructor(grid) {
        console.log("Button->App->Alg->Grid_Open->GridOpen clicked");

        super(grid);
    }

    step() {
        const cell = this.grid.getCell(this.row,  this.col);
        // console.log(this.row + ":" + this.col);
        
        if(cell) {
            cell.type = CellType.GENERATION;
            cell.links = [0, 1, 2, 3];

            if(this.row < this.grid.rows - 1)
            {
                this.row++;
            }
            else if(this.col < this.grid.cols - 1) {
                this.row = 0;
                this.col++;
            }
            else {
                this.done = true;
            }
        }
        else {
            this.done = true;
        }
    }
}