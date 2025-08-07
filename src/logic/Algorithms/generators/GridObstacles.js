import { CellType } from '../../grid/CellTypes';
import Generator from './Generator';

export class GridObstacles extends Generator {
    constructor(grid) {
        super(grid);
        grid.isOpen = true;

        this.currGenCol = 0;

        this.obstacleCount = 0;
        this.obstaclePercent = 0.3;
        this.newVsAppendRatio = 0.05;

        this.nextList = [];
        this.createNewObstacleOrigin();
    }

    static id = "Obstacle Grid";
    getName() { return GridObstacles.id }

    step() {
        super.step();

        // First Start the algorithm by connecting all cells together like OpenGrid
        if(this.currGenCol < this.grid.cols) {
            this.openTheGrid();
            return;
        }

        // Then once all connected, start breaking it apart with obstacles.
        const cell = this.getCurrCell();
        if(cell) {
            this.breakLinks(cell);
            this.createObstacleCell(cell);

            this.addNextCells();

            // select next cell to step()
            if(this.isNewObstacle()) {
                this.createNewObstacleOrigin();
            } else {
                this.appendToObstacle();
            }

            if(this.nextList.length <= 0 || this.isEnoughObstacles()) {
                this.finalize();
            }
        }
        else {
            this.finalize();
        }
    }

    isEnoughObstacles() {
        let obstacleCellsPerGridSize = this.obstacleCount / (this.grid.rows * this.grid.cols);
        if(isNaN(obstacleCellsPerGridSize)) obstacleCellsPerGridSize = 0;

        return obstacleCellsPerGridSize >= this.obstaclePercent;
    }

    createObstacleCell(cell) {
        if(!this.isBehaviorType(cell)) {
            cell.type = CellType.WALL;
            cell.isNext = false;
            this.obstacleCount++;
        }
    }

    appendToObstacle() {
        const randIndex = Math.floor(Math.random() * this.nextList.length);
        const cell = this.nextList[randIndex];
        this.nextList.splice(randIndex, 1);

        this.setCurrCell(cell);
    }

    createNewObstacleOrigin() {
        let cell;

        do {
            cell = this.getRandGridCell();
        } while (cell.type === CellType.WALL || this.isBorderCell(cell));

        this.setCurrCell(cell);
        cell.isNext = true;
    }

    // newVsAppendRatio is the probability it will return true for new obstacle origin
    // vs append to existing obstacle
    isNewObstacle() {
        return Math.random() < this.newVsAppendRatio;
    }

    openTheGrid() {
        for(let row = 0; row < this.grid.rows; row++) {
            const cell = this.grid.getCell(row, this.currGenCol);
            this.setTypeGeneration(cell);
            this.setLinks(cell);
        }
        
        this.currGenCol++;
    }

    setLinks(cell) {
        for(let dir of this.getDirectionList()) {
            const { r, c } = this.getNeighborPosition(cell, dir);

            if(this.isBounded(r, c)) cell.links.push(dir);
        }
    }

    breakLinks(cell) {
        for(let dir of this.getDirectionList()) {
            const neighborCell = this.getNeighborCell(dir);

            if(neighborCell) {
                const dir1to2 = this.getLinkDirection(cell, neighborCell);
                const dir2to1 = this.getLinkDirection(neighborCell, cell);

                this.removeLink(cell, dir1to2);
                this.removeLink(neighborCell, dir2to1);
            }
        }
    }

    addNextCells() {
        for(let dir of this.getDirectionList()) {
            const nextCell = this.getNeighborCell(dir);

            if(nextCell && nextCell.type == CellType.GENERATION && !this.isBorderCell(nextCell)) {
                nextCell.isNext = true;
                this.nextList.push(nextCell);
            }
        }
    }

    isBorderCell(cell) {
        return cell.row === 0 || cell.row === this.grid.rows - 1 ||
               cell.col === 0 || cell.col === this.grid.cols - 1;
    }

    removeLink(cell, dir) {
        const idx = cell.links.indexOf(dir);
        if(idx !== -1) cell.links.splice(idx, 1);
    }
}