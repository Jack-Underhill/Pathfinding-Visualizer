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
            this.setTypeGeneration(cell);
            this.setLinks(cell);

            if(this.row < this.grid.rows - 1) {
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
        for(let dir of this.getDirectionList()) {
            const { r, c } = this.getNeighborPosition(cell, dir);

            if(this.isBounded(r, c)) cell.links.push(dir);
        }
    }
}