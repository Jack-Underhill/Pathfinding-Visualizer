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
            this.setTypeGeneration(cell);
            cell.visited = true;

            const newCell = this.getRandomWalk(cell);
            if(newCell) {
                this.linkCells(cell, newCell);
                this.setParent(newCell, cell);
                this.setCurrCell(newCell);
            } else if(cell.type === CellType.START) {
                this.finalize();
            } else {
                // Backtrack
                this.setCurrCell(cell.parent);
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

    getWalkableDirections(cell) {
        const availDirs = [];

        for(let dir of this.getDirectionList()) {
            const { r, c } = this.getNeighborPosition(cell, dir);

            if(this.isGeneratable(r, c)) availDirs.push(dir);
        }

        return availDirs;
    }

    getRandomWalk(cell) {
        const availDirs = this.getWalkableDirections(cell);
        if(availDirs.length <= 0) return null;

        const randDirIndex = Math.floor(Math.random() * availDirs.length);
        return this.getNeighborCell(availDirs[randDirIndex]);
    }
}