import { CellType } from "../../grid/CellTypes";

import Generator from './Generator';

export class GridRandom extends Generator {
    constructor(grid) {
        super(grid);
        this.setTypeToRandomCell(CellType.START);
    }

    static id = "Random Grid";
    getName() { return GridRandom.id }

    step() {
        super.step();
        
        const cell = this.getCurrCell();
        if(cell) {
            cell.visited = true;

            if(cell.type === CellType.EMPTY) {
                cell.type = CellType.GENERATION; 
            }

            const availableDirs = this.getWalkableDirections();

            let newCell;
            if(availableDirs.length > 0) {
                newCell = this.getRandomWalk(availableDirs);

                const newDir = this.getDirection(newCell, cell);
                const oldDir = this.getDirection(cell, newCell);

                newCell.links.push(oldDir);
                cell.links.push(newDir);

                newCell.parent = cell;
                this.row = newCell.row;
                this.col = newCell.col;
            } else if(cell.type === CellType.START) {
                this.finalize();
                return;
            } else {
                newCell = cell.parent;
                this.row = newCell.row;
                this.col = newCell.col;
                this.step();
            }
        }
        else {
            this.finalize();
        }
    }

    isGeneratable(r, c) {
        const cell = this.grid.getCell(r, c);

        return(cell &&
               this.isBounded(r, c) && 
               !cell.visited);
    }

    getWalkableDirections() {
        const avail = [];

        if(this.isGeneratable(this.row - 1, this.col)) { avail.push(0); }
        if(this.isGeneratable(this.row, this.col - 1)) { avail.push(1); }
        if(this.isGeneratable(this.row + 1, this.col)) { avail.push(2); }
        if(this.isGeneratable(this.row, this.col + 1)) { avail.push(3); }

        return avail;
    }

    getRandomWalk(avail) {
        const randDirIndex = Math.floor(Math.random() * avail.length);
        let cell = this.getNeighborCell(avail[randDirIndex]);

        return cell;
    }
}