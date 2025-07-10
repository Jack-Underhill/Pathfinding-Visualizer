import { useCallback, useEffect, useRef, useState } from 'react';

import { Grid } from "./logic/grid/Grid";
import { MouseInput } from "./logic/MouseInput";
import { GridOpen } from "./logic/Algorithms/maze/GridOpen";
import { GridRandom } from "./logic/Algorithms/maze/GridRandom";
import { PFDFS } from './logic/Algorithms/pathfind/PFDFS';
import { PFBFS } from './logic/Algorithms/pathfind/PFBFS';

import CanvasGrid from "./components/CanvasGrid";
import NavBar from './components/NavBar';

import PanelRight from './components/PanelRight/PanelRight';
import PanelLeft from './components/PanelLeft/PanelLeft';

function App() {
  const [gridSize, setGridSize] = useState(25);
  const [grid, setGrid] = useState(new Grid(gridSize, gridSize));
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [currPF, setCurrPF] = useState(null);
  const [currGrid, setCurrGrid] = useState(null);
  const [visitedStat, setVisitedStat] = useState(0);
  const [pathStat, setPathStat] = useState(0);
  const [runtimeStat, setRuntimeStat] = useState(0);
  const [recentRuns, setRecentRuns] = useState([]);

  const mouseInputRef = useRef(new MouseInput(grid));
  const gridSizeRef = useRef(gridSize);
  const speedRef = useRef(speed);
  const visitedStatRef = useRef(visitedStat);
  const pathStatRef = useRef(pathStat);
  const runtimeStatRef = useRef(runtimeStat);
  let currPFRef = useRef(null);
  let currGridRef = useRef(null);

  const runAlgo = (algo) => {
    if(!algo || algo.isDone()) {
      updatePFStats();
      setRunning(false);
      return;
    }

    algo.step();

    setGrid(Object.assign(Object.create(Object.getPrototypeOf(grid)), grid));
    setTimeout(() => runAlgo(algo), speedRef.current);
  }

  const startAlgo = async (algoName) => {
    if(!running) {
      setVisitedStat(0);
      setPathStat(0);
      setRuntimeStat(0);
      let algo;
      
      switch(algoName) {
        case "OpenGrid":
          grid.resetGrid(gridSize, gridSize);
          algo = new GridOpen(grid);
          setCurrGrid(algo);
          setCurrPF(null);
          break;
        case "RandomGrid":
          grid.resetGrid(gridSize, gridSize);
          algo = new GridRandom(grid);
          setCurrGrid(algo);
          setCurrPF(null);
          break;
        // case "PrimsGrid":
        //   setAlgorithm(new GridPrims(grid));
        //   break;
        case "DFSPF":
          grid.resetPF();
          algo = new PFDFS(grid);
          setCurrPF(algo);
          break;
        case "BFSPF":
          grid.resetPF();
          algo = new PFBFS(grid);
          setCurrPF(algo);
          break;
        // case "AStarPF":
        //   setAlgorithm(new PFAStar(grid));
        //   break;
        // case "SHPBFSPF":
        //   setAlgorithm(new PFSHPBFS(grid));
        //   break;
        // case "SHPAStarPF":
        //   setAlgorithm(new PFSHPAStar(grid));
        //   break;
        default:
          console.log("Input algorithm does not exist!");
          setRunning(false);
          return
      }
  
      setRunning(true);
      runAlgo(algo);
    }
  }

  const postRun = async (data) => {
    try {
      const res = await fetch('/.netlify/functions/insertRun', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if(!res.ok) throw new Error(result.message);
      console.log("POST success:", result);

      fetchRuns();
    } catch (err) {
      console.error("POST error:", err);
    }
  };
  
  const fetchRuns = async () => {
    const algoName = currPFRef.current?.getName?.();
    const gridName = currGridRef.current?.getName?.();
    if(!algoName || !gridName) return;

    try {
      const res = await fetch(`/.netlify/functions/getRuns?algorithm=${algoName}&grid=${gridName}`);
      const result = await res.json();
      setRecentRuns(result.data);
    } catch (err) {
      console.error("GET error:", err);
    }
  }
  
  const getHeadlessRuntime = async (pfInstance, grid, minRepeatThreshold = 1, repeatCount = 20) => {
    // Clone the grid (non-mutating)
    const cloneGrid = () => Object.assign(Object.create(Object.getPrototypeOf(grid)), grid);

    // Single run with high precision
    const runOnce = () => {
      const tempPF = new pfInstance.constructor(cloneGrid());
      const start = performance.now();
      tempPF.runInstant();
      const end = performance.now();
      return end - start;
    };

    const firstRun = runOnce();

    if (firstRun < minRepeatThreshold) {
      let total = firstRun;
      for (let i = 1; i < repeatCount; i++) {
        total += runOnce();
      }
      return total / repeatCount;
    }

    return firstRun;
  };


  let latestRunId = 0
  const runInstantPF = useCallback(() => {
    if(!currPFRef.current || !grid.isEditable || !currPFRef.current.isSearchable) {
      setRunning(false);
      return;
    }

    let runId = ++latestRunId;
    setTimeout(() => {
      if(runId !== latestRunId) return;
    }, 0);

    const pfInstance = currPFRef.current;
    pfInstance.grid = grid;
    pfInstance.runInstant();

    setGrid(Object.assign(Object.create(Object.getPrototypeOf(grid)), grid));
    updatePFStats(false);
  }, [grid]);

  const updatePFStats = async (shouldPost = true) => {
    const pf = currPFRef.current;
    const gr = currGridRef.current;
    if(!pf || !gr) return;

    const visited = pf.visitedCount;
    const path = pf.pathCount;
    const runtime = await getHeadlessRuntime(pf, grid);

    setVisitedStat(visited);
    setPathStat(path);
    setRuntimeStat(runtime);

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
  };

  useEffect(() => {
    fetchRuns();
  }, []);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    gridSizeRef.current = gridSize;
  }, [gridSize]);

  useEffect(() => {
    visitedStatRef.current = visitedStat;
  }, [visitedStat]);

  useEffect(() => {
    pathStatRef.current = pathStat;
  }, [pathStat]);

  useEffect(() => {
    runtimeStatRef.current = runtimeStat;
  }, [runtimeStat]);

  useEffect(() => {
    currPFRef.current = currPF;
  }, [currPF]);

  useEffect(() => {
    currGridRef.current = currGrid;
  }, [currGrid]);

  useEffect(() => {
    mouseInputRef.current.grid = grid;
  }, [grid]);

  const card = 'rounded-2xl';
  const containerCard = ' ' + card;

  return (
    <div className='p-8 h-screen flex flex-col gap-5'>
      <NavBar />

      <div className='h-full flex-1 flex gap-5 items-center justify-center bg-background'>
        <div className={`${containerCard} h-full flex-1/5`}>
            <PanelLeft
              onRunAlgo={startAlgo}
              onSpeedChange={setSpeed}
              onGridSizeChange={setGridSize}
              speed={speed}
              gridSize={gridSize}
              visitedCells={visitedStat}
              pathCells={pathStat}
              runtime={runtimeStat}
            />
        </div>
        <div className={`${containerCard} h-full flex-1/2 flex flex-col gap-6`}>
          <div className="text-center p-2 flex justify-center text-5xl font-bold text-sky-400">
            Pathfinding Visualizer
          </div>
          <div className='flex h-[75vh] items-center justify-center'>
            <CanvasGrid
              grid={grid}
              mouseInput={mouseInputRef.current}
              onReRender={setGrid}
              onCellMove={runInstantPF}
              className="h-fit"
            />
          </div>
        </div>
        <div className={`${containerCard} h-full flex-1/3 flex flex-col gap-3`}>
            <PanelRight 
              isRunning={running}
              currGrid={currGrid}
              currPF={currPF}
              recentRuns={recentRuns}
            />
        </div>
      </div>
    </div>
  )
}

export default App