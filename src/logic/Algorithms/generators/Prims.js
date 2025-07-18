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
            this.setCurrCell(cell);
            cell.visited = true;

            if(cell.type === CellType.EMPTY) {
                cell.type = CellType.GENERATION; 
            }
            
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
        const directions = this.shuffle([0, 1, 2, 3]);

        for(let dir of directions) {
            const neighbor = this.getNeighborCell(dir);

            if(neighbor?.visited) {
                const fromNextToVisited = this.getDirection(nextCell, neighbor);
                const fromVisitedToNext = this.getDirection(neighbor, nextCell);

                nextCell.links.push(fromVisitedToNext);
                neighbor.links.push(fromNextToVisited);

                break;
            }
        }
    }

    addNextCells() {
        for(let dir = 0; dir < 4; dir++) {
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

    shuffle(arr) {
        for(let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        
        return arr;
    }
}