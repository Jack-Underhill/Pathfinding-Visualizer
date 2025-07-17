import { useEffect, useRef, useState } from 'react';

export function useStats({ gridSizeRef, currGridGenRef, currPFRef, postRun }) {
    const [stepStat, setStepStat] = useState(0);
    const [visitedStat, setVisitedStat] = useState(0);
    const [pathStat, setPathStat] = useState(0);
    const [runtimeStat, setRuntimeStat] = useState(0);

    const stepStatRef = useRef(stepStat);
    const visitedStatRef = useRef(visitedStat);
    const pathStatRef = useRef(pathStat);
    const runtimeStatRef = useRef(runtimeStat);
    
    useEffect(() => { stepStatRef.current = stepStat; }, [stepStat]);
    useEffect(() => { visitedStatRef.current = visitedStat; }, [visitedStat]);
    useEffect(() => { pathStatRef.current = pathStat; }, [pathStat]);
    useEffect(() => { runtimeStatRef.current = runtimeStat; }, [runtimeStat]);

    // Statistics of finished runs
    const updatePFStats = async () => {
        const pf = currPFRef.current;
        const gr = currGridGenRef.current;
        if(!pf || !gr) return;

        await updateRuntimeStats(pf);
        await updatePostRun(pf, gr);
    }

    // Runtime Statistics
    const updateRuntimeStats = async (pf) => {
        if(!pf) return;

        setStepStat(pf.stepCount);
        setVisitedStat(pf.visitedCount);
        setPathStat(pf.pathCount);
        setRuntimeStat(pf.runtime);
    }

    const updatePostRun = async (pf, gr) => {
        if(pf.runtime === 0) return;

        await postRun({
            grid: gr.getName(),
            algorithm: pf.getName(),
            visited_steps: pf.visitedCount,
            path_steps: pf.pathCount,
            runtime_ms: pf.runtime,
            grid_size: gridSizeRef.current * gridSizeRef.current,
        });
    }

    return {
        stepStat, setStepStat, stepStatRef,
        visitedStat, setVisitedStat, visitedStatRef,
        pathStat, setPathStat, pathStatRef,
        runtimeStat, setRuntimeStat, runtimeStatRef,
        updatePFStats, updateRuntimeStats,
    };
}