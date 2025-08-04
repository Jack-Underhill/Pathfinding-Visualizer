import { useCallback, useEffect, useRef, useState } from 'react';

import { GridOpen } from "../logic/Algorithms/generators/GridOpen";
import { GridRandom } from "../logic/Algorithms/generators/GridRandom";
import { GridPrims } from '../logic/Algorithms/generators/GridPrims';
import { GridHuntAndKill } from '../logic/Algorithms/generators/GridHuntAndKill';

import { PFDFS } from '../logic/Algorithms/pathfind/PFDFS';
import { PFBFS } from '../logic/Algorithms/pathfind/PFBFS';
import { PFAStar } from '../logic/Algorithms/pathfind/PFAStar';

import { getHeadlessRuntime } from '../utils/getHeadlessRuntime';

export function useAlgorithmControl({ gridRef, gridSize, currGridGenRef, currPFRef, setRenderVersion, updatePFStats, updateRuntimeStats, refreshCharts }) {
    const [running, setRunning] = useState(false);
    const [speed, setSpeed] = useState(100);
    
    const speedRef = useRef(speed);

    const latestRunId = useRef(0);
    const currPFClassRef = useRef(null);
    
    useEffect(() => { speedRef.current = speed; }, [speed]);


    const startAlgo = async (algoName) => {
        if(!running) {
            let algo;
            
            switch(algoName) {
                // Grid Generators
                case "OpenGrid":
                    algo = initGridGen(GridOpen);
                    break;
                case "RandomGrid":
                    algo = initGridGen(GridRandom);
                    break;
                case "HuntAndKillGrid":
                    algo = initGridGen(GridHuntAndKill);
                    break;
                case "PrimsGrid":
                    algo = initGridGen(GridPrims);
                    break;
                    
                // Pathfinders
                case "DFSPF":
                    algo = initPF(PFDFS);
                    break;
                case "BFSPF":
                    algo = initPF(PFBFS);
                    break;
                case "AStarPF":
                    algo = initPF(PFAStar);
                    break;
                // case "SHPBFSPF":
                    //   setAlgorithm(new PFSHPBFS(gridRef.current));
                    //   break;
                // case "SHPAStarPF":
                    //   setAlgorithm(new PFSHPAStar(gridRef.current));
                    //   break;
                default:
                    console.log("Input algorithm does not exist!");
                    setRunning(false);
                    return;
            }
            
            setRunning(true);
            refreshCharts();
            runAlgo(algo);
        }
    }

    const runAlgo = async (algo) => {
        if(!algo || algo.isDone()) {
            if(currPFRef.current) {
                currPFRef.current.runtime = await getHeadlessRuntime(currPFRef.current, gridRef);
                await updatePFStats();
                refreshCharts();
            }

            setRunning(false);
            return;
        }

        algo.step();

        gridRef.current = algo.grid;
        setRenderVersion(prevRender => prevRender + 1);

        updateRuntimeStats(currPFRef.current);
        setTimeout(() => runAlgo(algo), speedRef.current);
    }
    
    const runInstantPF = useCallback(() => {
        if(!currPFRef.current || !gridRef.current.isEditable || !currPFRef.current.isSearchable) {
            setRunning(false);
            return;
        }

        let runId = ++latestRunId.current;
        setTimeout(() => {
            if(runId !== latestRunId.current) return;
        }, 0);
        
        gridRef.current.resetForPF();
        currPFRef.current = new currPFClassRef.current(gridRef.current);

        currPFRef.current.runInstant();

        gridRef.current = currPFRef.current.grid;
        setRenderVersion(prevRender => prevRender + 1);

        updateRuntimeStats(currPFRef.current);
    }, []);

    const initGridGen = (genClass) => {
        gridRef.current.resetForGridGen(gridSize, gridSize);
        const genAlgo = new genClass(gridRef.current);

        currGridGenRef.current = genAlgo;
        currPFRef.current = null;
        currPFClassRef.current = null;

        return genAlgo;
    }

    const initPF = (pfClass) => {
        gridRef.current.resetForPF();
        const pfAlgo = new pfClass(gridRef.current);

        currPFRef.current = pfAlgo;
        currPFClassRef.current = pfClass;

        return pfAlgo;
    }
    

    return {
        running, setRunning,
        speed, setSpeed, speedRef,
        startAlgo, runInstantPF,
    };
}