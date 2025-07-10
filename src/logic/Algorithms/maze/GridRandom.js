import { CellType } from "../../grid/CellTypes";
import Alg from "../Alg"

export class GridRandom extends Alg {
    constructor(grid) {
        super(grid, false);
        this.setTypeToRandomCell(CellType.START);
    }

    static id = "Random Grid";
    getName() { return GridRandom.id }

    step() {
        let cell = this.getCurrCell();
        
        if(cell) {
            cell.visited = true;
            this.visitedCount++;

            if(cell.type === CellType.EMPTY) {
                cell.type = CellType.GENERATION; 
            }

            let availableDirs = this.getWalkableDirections();

            let newCell;
            if(availableDirs.length > 0) {
                newCell = this.getRandomWalk(availableDirs);

                let newDir = this.getDirection(newCell, cell);
                let oldDir = this.getDirection(cell, newCell);

                newCell.links.push(oldDir);
                cell.links.push(newDir);

                newCell.parent = cell;
                this.row = newCell.row;
                this.col = newCell.col;
            } else if(cell.type === CellType.START) {
                this.finalizeGrid();
                return;
            } else {
                newCell = cell.parent;
                this.row = newCell.row;
                this.col = newCell.col;
                this.step();
            }
        }
        else {
            this.finalizeGrid();
        }
    }

    isGeneratable(r, c) {
        let cell = this.grid.getCell(r, c);

        return(cell &&
               this.isBounded(r, c) && 
               !cell.visited);
    }

    getWalkableDirections() {
        let avail = [];

        if(this.isGeneratable(this.row - 1, this.col)) { avail.push(0); }
        if(this.isGeneratable(this.row, this.col - 1)) { avail.push(1); }
        if(this.isGeneratable(this.row + 1, this.col)) { avail.push(2); }
        if(this.isGeneratable(this.row, this.col + 1)) { avail.push(3); }

        return avail;
    }

    getRandomWalk(avail) {
        let randDirIndex = Math.floor(Math.random() * avail.length);
        let cell = this.getNeighborCell(avail[randDirIndex]);

        return cell;
    }
}