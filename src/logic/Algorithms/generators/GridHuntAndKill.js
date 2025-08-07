import { CellType } from "../../grid/CellTypes";

import Generator from './Generator';

export class GridHuntAndKill extends Generator {
    constructor(grid) {
        super(grid);
        this.setTypeToRandomCell(CellType.START);

        this.huntIdx = { col: 0, row: 0 };
    }

    static id = "Hunt and Kill Grid";
    getName() { return GridHuntAndKill.id }

    step() {
        super.step();

        const cell = this.getCurrCell();
        if(cell && this.huntIdx) {
            this.setTypeGeneration(cell);
            cell.visited = true;

            const newCell = this.getRandomWalk(cell);
            if(newCell) {
                this.linkCells(cell, newCell);
                this.setCurrCell(newCell);
            } else {
                // Find new unvisited cell to recurse a new hunt and kill
                this.findNewHunt();
            }
        }
        else {
            this.finalize();
        }
    }

    findNewHunt() {
        for(let row = 0; row < this.grid.rows; row++) {
            for(let col = 0; col < this.grid.cols; col++) {
                const currCell = this.grid.getCell(row, col);

                const neighborCell = this.getVisitedNeighbor(currCell);
                if(currCell.type === CellType.EMPTY && neighborCell) {
                    this.linkCells(neighborCell, currCell);

                    this.huntIdx = { row, col };
                    this.setCurrCell(currCell);
                    return;
                }
            }
        }

        this.huntIdx = null;
    }

    getVisitedNeighbor(cell) {
        for(let dir of this.shuffle(this.getDirectionList())) {
            const neighborCell = this.hasVisitedNeighbor(cell, dir);
            if(neighborCell) return neighborCell;
        }

        return null;
    }

    hasVisitedNeighbor(cell, direction) {
        const { r, c } = this.getNeighborPosition(cell, direction);
        const neighborCell = this.grid.getCell(r, c);

        if(neighborCell && neighborCell.type !== CellType.EMPTY) return neighborCell;

        return null;
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