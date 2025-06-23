import { useEffect, useRef } from "react";
import { CellType } from "../logic/grid/CellTypes";

function CanvasGrid({ grid, mouseInput, onReRender, onCellMove }) {
    const canvasRef = useRef(null);
    const cellSizeRef = useRef(20);

    const getCellSize = () => cellSizeRef.current;
 
    const getMousePos = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        const col = Math.floor(x / getCellSize());
        const row = Math.floor(y / getCellSize());

        return { row, col };
    }

    const handleMouseDown = (e) => {
        const { row, col } = getMousePos(e);
        mouseInput.down(row, col);
    }

    const handleMouseMove = (e) => {
        const { row, col } = getMousePos(e);
        
        if(mouseInput.move(row, col)) {
            onReRender(Object.assign(Object.create(Object.getPrototypeOf(grid)), grid));
            if(onCellMove) onCellMove();
        }
    }

    const handleMouseUp = () => {
        mouseInput.up();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas || !grid) return;

        const container = canvas.parentNode;

        const resizeAndDraw = () => {
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;

            const size = Math.min(containerWidth, containerHeight);
            const cellSize = Math.floor(size / grid.cols);
            cellSizeRef.current = cellSize;

            canvas.width = grid.cols * cellSize;
            canvas.height = grid.rows * cellSize;
            
            const ctx = canvas.getContext("2d");
            if(!ctx) throw new Error("Canvas 2D context is not available");

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for(let r = 0; r < grid.rows; r++) {
                for(let c = 0; c < grid.cols; c++) {
                    const cell = grid.getCell(r, c);
                    drawCell(ctx, cell);
                }
            }
        }

        const observer = new ResizeObserver(resizeAndDraw)
        observer.observe(container);

        resizeAndDraw();

        return () => observer.disconnect();
    }, [grid]);

    const drawCell = (ctx, cell) => {
        const x = cell.col * getCellSize();
        const y = cell.row * getCellSize();

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

        ctx.fillRect(x, y, getCellSize(), getCellSize());

        ctx.strokeStyle = '#161C24';
        ctx.beginPath();

        if(grid.isOpen || !cell.links.includes(0))
            ctx.moveTo(x, y), ctx.lineTo(x + getCellSize(), y)
        if(grid.isOpen || !cell.links.includes(1))
            ctx.moveTo(x, y), ctx.lineTo(x, y + getCellSize())
        if(grid.isOpen || !cell.links.includes(2))
            ctx.moveTo(x, y + getCellSize()), ctx.lineTo(x + getCellSize(), y + getCellSize())
        if(grid.isOpen || !cell.links.includes(3))
            ctx.moveTo(x + getCellSize(), y), ctx.lineTo(x + getCellSize(), y + getCellSize())

        ctx.stroke();
    }

    return (
        <canvas 
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="w-full"
        />
    )
}

export default CanvasGrid;