import { useRef } from 'react';

import { useGridState } from './useGridState';
import { useAlgorithmControl } from './useAlgorithmControl';
import { useStats } from './useStats';
import { useDatabase } from './useDatabase';

export function useVisualizerLogic() {
    const {
        grid, setGrid, gridRef,
        gridSize, setGridSize, gridSizeRef,
        mouseInputRef,
        renderVersion, setRenderVersion,
    } = useGridState();

    let currGridGenRef = useRef(null);
    let currPFRef = useRef(null);

    const {
        recentRuns, setRecentRuns,
        postRun, fetchRuns,
    } = useDatabase({ currGridGenRef, currPFRef });

    const {
        visitedStat, setVisitedStat, visitedStatRef,
        pathStat, setPathStat, pathStatRef,
        runtimeStat, setRuntimeStat, runtimeStatRef,
        updatePFStats,
    } = useStats({ gridRef, gridSizeRef, currGridGenRef, currPFRef, postRun });

    const {
        running, setRunning,
        speed, setSpeed, speedRef,
        startAlgo, runInstantPF,
    } = useAlgorithmControl({ gridRef, gridSize, currGridGenRef, currPFRef, mouseInputRef, setRenderVersion, updatePFStats });


    return {
        grid, setGrid, gridRef,
        gridSize, setGridSize, gridSizeRef,
        mouseInputRef,
        renderVersion, setRenderVersion,

        currGridGenRef, currPFRef,
        
        running, setRunning,
        speed, setSpeed, speedRef,
        startAlgo, runInstantPF,
        
        visitedStat, setVisitedStat, visitedStatRef,
        pathStat, setPathStat, pathStatRef,
        runtimeStat, setRuntimeStat, runtimeStatRef,
        updatePFStats,
        
        recentRuns, setRecentRuns,
        postRun, fetchRuns,
    };
}