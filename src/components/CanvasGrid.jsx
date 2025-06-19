import { useEffect, useRef } from "react";
import { CellType } from "../logic/grid/CellTypes";

function CanvasGrid({ grid }) {
    const canvasRef = useRef(null);
    const cellSize = 20;

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
        ctx.strokeRect(x, y, cellSize, cellSize);
    }

    return (
        <div className="flex justify-center items-center">
            <canvas ref={canvasRef}/>
        </div>
    )
}

export default CanvasGrid;