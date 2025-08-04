import Pathfind from './Pathfind';

import { PriorityQueue } from '../PriorityQueue';

export class PFAStar extends Pathfind {
    constructor(grid) {
        super(grid);

        const startCell = this.grid.start;

        this.gScore = new Map();
        this.fScore = new Map();
        this.setScores(startCell, 0);

        this.pq = new PriorityQueue();
        this.addToPQ(startCell);

        this.zigZagSwitch = false;
    }

    static id = "A Star";
    getName() { return PFAStar.id }

    step() {
        const currCell = this.pq.dequeue();
        super.step(currCell);

        if(this.isEnd(currCell)) {
            this.finalize();
            return;
        }

        this.addNextCells(currCell);

        // Fail Case: Expanded as far as it could but did not find the end.
        if(this.pq.isEmpty()) {
            this.done = true;
            this.grid.isEditable = true;
        }
    }

    addNextCells(currCell) {
        for(let dir of this.getDirectionList()) {
            const nextCell = this.getNeighborCell(dir);

            if(this.isLinked(currCell, nextCell, dir)) {
                const tentativeGScore = this.gScore.get(currCell) + this.getGDistance(currCell, dir);

                this.scoreNextCell(currCell, nextCell, tentativeGScore);
            }
        }
    }

    addToPQ(cell) {
        this.pq.enqueue(cell, this.fScore.get(cell));
    }

    getGDistance(currCell, dir) {
        const endCell = this.grid.end;

        const dc = Math.abs(endCell.col - currCell.col);
        const dr = Math.abs(endCell.row - currCell.row);

        if((dir % 2 === 0 && dr < dc) ||
           (dir % 2 === 1 && dr > dc)) {
               return 0.1;
        } else {
            return 1;
        }
    }

    heuristic(currCell) {
        const endCell = this.grid.end;

        const dc = Math.abs(endCell.col - currCell.col);
        const dr = Math.abs(endCell.row - currCell.row);

        return dc + dr;
    }

    scoreNextCell(currCell, nextCell, tentativeGScore) {
        if(!this.isVisited(nextCell) && 
           tentativeGScore < (this.gScore.get(nextCell) ?? Infinity)) 
        {
            this.setScores(nextCell, tentativeGScore);
            
            if(!this.isNext(nextCell)) {
                this.addToPQ(nextCell);
                this.updateNextCell(nextCell, currCell);
            }
        }
    }

    setScores(cell, score) {
        this.gScore.set(cell, score);
        this.fScore.set(cell, score + this.heuristic(cell));
    }
}