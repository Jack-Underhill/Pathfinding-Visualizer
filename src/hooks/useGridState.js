import { useEffect, useRef, useState } from 'react';

import { Grid } from "../logic/grid/Grid";
import { MouseInput } from "../logic/MouseInput";

export function useGridState(initialSize = 25) {
    const [grid, setGrid] = useState(new Grid(initialSize, initialSize));
    const [gridSize, setGridSize] = useState(initialSize);
    const [renderVersion, setRenderVersion] = useState(0);

    const gridRef = useRef(grid);
    const gridSizeRef = useRef(gridSize);
    const mouseInputRef = useRef(new MouseInput(gridRef));

    useEffect(() => { 
        gridRef.current = grid; 
        mouseInputRef.current.gridRef = gridRef;
    }, [grid]);
    useEffect(() => { gridSizeRef.current = gridSize; }, [gridSize]);


    return {
        grid, setGrid, gridRef,
        gridSize, setGridSize, gridSizeRef,
        mouseInputRef,
        renderVersion, setRenderVersion
    };
}