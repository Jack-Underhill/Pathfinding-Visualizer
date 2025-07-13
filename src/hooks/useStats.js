import { useEffect, useRef, useState } from 'react';

import { getHeadlessRuntime } from '../utils/getHeadlessRuntime';

export function useStats({ gridRef, gridSizeRef, currGridGenRef, currPFRef, postRun }) {
    const [visitedStat, setVisitedStat] = useState(0);
    const [pathStat, setPathStat] = useState(0);
    const [runtimeStat, setRuntimeStat] = useState(0);

    const visitedStatRef = useRef(visitedStat);
    const pathStatRef = useRef(pathStat);
    const runtimeStatRef = useRef(runtimeStat);
    
    useEffect(() => { visitedStatRef.current = visitedStat; }, [visitedStat]);
    useEffect(() => { pathStatRef.current = pathStat; }, [pathStat]);
    useEffect(() => { runtimeStatRef.current = runtimeStat; }, [runtimeStat]);


    const updatePFStats = async (shouldPost = true) => {
        const pf = currPFRef.current;
        const gr = currGridGenRef.current;
        if(!pf || !gr) return;

        const visited = pf.visitedCount;
        const path = pf.pathCount;
        const runtime = shouldPost ? await getHeadlessRuntime(pf, gridRef) : pf.runTime;

        if(pf.isSearchable && shouldPost) {
            postRun({
                grid: gr.getName(),
                algorithm: pf.getName(),
                visited_steps: visited,
                path_steps: path,
                runtime_ms: runtime,
                grid_size: gridSizeRef.current * gridSizeRef.current,
            });
        }

        setVisitedStat(visited);
        setPathStat(path);
        setRuntimeStat(runtime);
    };

    return {
        visitedStat, setVisitedStat, visitedStatRef,
        pathStat, setPathStat, pathStatRef,
        runtimeStat, setRuntimeStat, runtimeStatRef,
        updatePFStats,
    };
}