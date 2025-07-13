import { useCallback, useEffect, useRef, useState } from 'react';

import { GridOpen } from "../logic/Algorithms/maze/GridOpen";
import { GridRandom } from "../logic/Algorithms/maze/GridRandom";
import { PFDFS } from '../logic/Algorithms/pathfind/PFDFS';
import { PFBFS } from '../logic/Algorithms/pathfind/PFBFS';

export function useAlgorithmControl({ gridRef, gridSize, currGridGenRef, currPFRef, mouseInputRef, setRenderVersion, updatePFStats }) {
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
                case "OpenGrid":
                    algo = initGridGen(GridOpen);
                    break;
                case "RandomGrid":
                    algo = initGridGen(GridRandom);
                    break;
                // case "PrimsGrid":
                    //   setAlgorithm(new GridPrims(gridRef.current));
                    //   break;
                case "DFSPF":
                    algo = initPF(PFDFS);
                    break;
                case "BFSPF":
                    algo = initPF(PFBFS);
                    break;
                // case "AStarPF":
                    //   setAlgorithm(new PFAStar(gridRef.current));
                    //   break;
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
            runAlgo(algo);
        }
    }

    const runAlgo = (algo) => {
        if(!algo || algo.isDone()) {
            updatePFStats();
            setRunning(false);
            return;
        }

        algo.step();

        gridRef.current = algo.grid;
        setRenderVersion(prevRender => prevRender + 1);
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

        const pfInstance = new currPFClassRef.current(gridRef.current);

        currPFRef.current = pfInstance;
        pfInstance.runInstant();

        gridRef.current = pfInstance.grid;
        setRenderVersion(prevRender => prevRender + 1);

        updatePFStats(false);
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