import { useEffect, useRef } from "react";
import { CellType } from "../logic/grid/CellTypes";

function CanvasGrid({ gridRef, mouseInput, renderVersion, setRenderVersion, onCellMove }) {
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
            setRenderVersion(prevRender => prevRender + 1);
            if(onCellMove) onCellMove();
        }
    }

    const handleMouseUp = () => {
        mouseInput.up();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas || !gridRef.current) return;

        const container = canvas.parentNode;

        const resizeAndDraw = () => {
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;

            const size = Math.min(containerWidth, containerHeight);
            const cellSize = Math.floor(size / gridRef.current.cols);
            cellSizeRef.current = cellSize;

            canvas.width = gridRef.current.cols * cellSize;
            canvas.height = gridRef.current.rows * cellSize;
            
            const ctx = canvas.getContext("2d");
            if(!ctx) throw new Error("Canvas 2D context is not available");

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for(let r = 0; r < gridRef.current.rows; r++) {
                for(let c = 0; c < gridRef.current.cols; c++) {
                    const cell = gridRef.current.getCell(r, c);
                    drawCell(ctx, cell);
                }
            }
        }

        const observer = new ResizeObserver(resizeAndDraw)
        observer.observe(container);

        resizeAndDraw();

        return () => observer.disconnect();
    }, [renderVersion]);

    const getCSSVar = (varName) => {
        return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    }

    const getHSLHeatColor = () => {
        const hue = 0 + (240 * (index / total));
        return `hsl(${heu}, 100%, 60%)`;
    }

    const drawCell = (ctx, cell) => {
        const x = cell.col * getCellSize();
        const y = cell.row * getCellSize();

        switch(cell.type) {
            case CellType.EMPTY:
                ctx.fillStyle = getCSSVar('--color-grid-empty');
                break;
            case CellType.GENERATION:
                ctx.fillStyle = getCSSVar('--color-grid-generation');
                break;
            case CellType.START:
                ctx.fillStyle = getCSSVar('--color-grid-start');
                break;
            case CellType.END:
                ctx.fillStyle = getCSSVar('--color-grid-end');
                break;
            case CellType.CHECKPOINT:
                ctx.fillStyle = '#FFE608';
                break;
            case CellType.VISITED:
                ctx.fillStyle = getCSSVar('--color-grid-visited');
                break;
            case CellType.PATH:
                ctx.fillStyle = getCSSVar('--color-grid-path');
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

        ctx.strokeStyle = getCSSVar('--color-grid-cellBorder');
        ctx.beginPath();

        if(gridRef.current.isOpen || !cell.links.includes(0))
            ctx.moveTo(x, y), ctx.lineTo(x + getCellSize(), y)
        if(gridRef.current.isOpen || !cell.links.includes(1))
            ctx.moveTo(x, y), ctx.lineTo(x, y + getCellSize())
        if(gridRef.current.isOpen || !cell.links.includes(2))
            ctx.moveTo(x, y + getCellSize()), ctx.lineTo(x + getCellSize(), y + getCellSize())
        if(gridRef.current.isOpen || !cell.links.includes(3))
            ctx.moveTo(x + getCellSize(), y), ctx.lineTo(x + getCellSize(), y + getCellSize())

        ctx.stroke();
    }

    return (
        <canvas 
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="w-auto"
        />
    )
}

export default CanvasGrid;