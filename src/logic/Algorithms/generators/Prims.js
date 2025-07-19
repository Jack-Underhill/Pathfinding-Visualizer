import { CellType } from "../../grid/CellTypes";

import Generator from './Generator';

export class Prims extends Generator {
    constructor(grid) {
        super(grid);
        this.setTypeToRandomCell(CellType.START);
        this.nextList = [];
        
        this.grid.start.isNext = true;
        this.nextList.push(this.grid.start);
    }

    static id = "Prims Grid";
    getName() { return Prims.id }

    step() {
        super.step();
        
        const cell = this.getNextCell();
        if(cell) {
            this.setTypeGeneration(cell);
            cell.visited = true;
            this.setCurrCell(cell);
            
            this.connectNextCell(cell);
            this.addNextCells();

            if(this.nextList.length <= 0) {
                this.finalize();
            }
        }
        else {
            this.finalize();
        }
    }

    getNextCell() {
        const randIndex = Math.floor(Math.random() * this.nextList.length);
        const cell = this.nextList[randIndex];
        this.nextList.splice(randIndex, 1);

        return cell;
    }

    connectNextCell(nextCell) {
        const directions = this.shuffle(this.getDirectionList());

        for(let dir of directions) {
            const visitedCell = this.getNeighborCell(dir);

            if(visitedCell?.visited) {
                this.linkCells(nextCell, visitedCell);
                break;
            }
        }
    }

    addNextCells() {
        for(let dir of this.getDirectionList()) {
            const nextCell = this.getNeighborCell(dir);

            if(this.isGeneratable(nextCell)) {
                nextCell.isNext = true;
                this.nextList.push(nextCell);
            }
        }
    }

    isGeneratable(cell) {
        return(cell && !cell.visited && !cell.isNext);
    }
}