import { useEffect, useRef } from "react";
import { CellType } from "../logic/grid/CellTypes";

function CanvasGrid({ grid, onReRender }) {
    const canvasRef = useRef(null);
    const cellSize = 20;

    const getMousePos = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const col = Math.floor(x / cellSize);
        const row = Math.floor(y / cellSize);

        return { row, col };
    }

    const handleMouseDown = (e) => {
        const { row, col } = getMousePos(e);
        grid.handleMouseDown(row, col);
    }

    const handleMouseMove = (e) => {
        const { row, col } = getMousePos(e);
        
        if(grid.handleMouseMove(row, col)) {
            onReRender(Object.assign(Object.create(Object.getPrototypeOf(grid)), grid));
        }
    }

    const handleMouseUp = () => {
        grid.handleMouseUp();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas || !grid) return;
        
        const ctx = canvas.getContext("2d");
        if(!ctx) throw new Error("Canvas 2D context is not available");

        canvas.width = grid.cols * cellSize;
        canvas.height= grid.rows * cellSize;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(let r = 0; r < grid.rows; r++) {
            for(let c = 0; c < grid.cols; c++) {
                const cell = grid.getCell(r, c);
                drawCell(ctx, cell);
            }
        }
    }, [grid]);

    const drawCell = (ctx, cell) => {
        const x = cell.col * cellSize;
        const y = cell.row * cellSize;

        // console.log(cell);

        switch(cell.type) {
            case CellType.EMPTY:
                ctx.fillStyle = '#161C24';
                break;
            case CellType.GENERATION:
                ctx.fillStyle = '#B8E6FE';
                break;
            case CellType.START:
                ctx.fillStyle = '#0CBA0C';
                break;
            case CellType.END:
                ctx.fillStyle = '#9E0A0C';
                break;
            case CellType.CHECKPOINT:
                ctx.fillStyle = '#FFE608';
                break;
            case CellType.VISITED:
                ctx.fillStyle = '#00598A';
                break;
            case CellType.PATH:
                ctx.fillStyle = '#00BCFF';
                break;
            case CellType.NEXT:
                ctx.fillStyle = '#BEDFF7';
                break;
            case CellType.WALL:
                ctx.fillStyle = '#3F4045';
                break;
            default:
                ctx.fillStyle = '#EDEDED';
        }

        ctx.fillRect(x, y, cellSize, cellSize);

        ctx.strokeStyle = '#161C24';
        ctx.beginPath();

        if(grid.isOpen || !cell.links.includes(0))
            ctx.moveTo(x, y), ctx.lineTo(x + cellSize, y)
        if(grid.isOpen || !cell.links.includes(1))
            ctx.moveTo(x, y), ctx.lineTo(x, y + cellSize)
        if(grid.isOpen || !cell.links.includes(2))
            ctx.moveTo(x, y + cellSize), ctx.lineTo(x + cellSize, y + cellSize)
        if(grid.isOpen || !cell.links.includes(3))
            ctx.moveTo(x + cellSize, y), ctx.lineTo(x + cellSize, y + cellSize)

        ctx.stroke();
    }

    return (
        <div className="flex justify-center items-center">
            <canvas 
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />
        </div>
    )
}

export default CanvasGrid;