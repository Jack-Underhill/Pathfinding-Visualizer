import { useCallback, useEffect, useRef, useState } from 'react';
import { Grid } from "./logic/grid/Grid";
import { MouseInput } from "./logic/MouseInput";
import { GridOpen } from "./logic/Algorithms/maze/GridOpen";
import { GridRandom } from "./logic/Algorithms/maze/GridRandom";
import { PFDFS } from './logic/Algorithms/pathfind/PFDFS';
import { PFBFS } from './logic/Algorithms/pathfind/PFBFS';
import CanvasGrid from "./components/CanvasGrid";
import ControlPanel from "./components/ControlPanel";

function App() {
  const [gridSize, setGridSize] = useState(25);
  const [grid, setGrid] = useState(new Grid(gridSize, gridSize));
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [currPF, setCurrPF] = useState(null);
  const [visitedStat, setVisitedStat] = useState(0);
  const [pathStat, setPathStat] = useState(0);
  const [runtimeStat, setRuntimeStat] = useState(0);

  const mouseInputRef = useRef(new MouseInput(grid));
  const gridSizeRef = useRef(gridSize);
  const speedRef = useRef(speed);
  const visitedStatRef = useRef(visitedStat);
  const pathStatRef = useRef(pathStat);
  const runtimeStatRef = useRef(runtimeStat);
  let currPFRef = useRef(null);

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
      let algo;
      
      switch(algoName) {
        case "OpenGrid":
          grid.resetGrid(gridSize, gridSize);
          algo = new GridOpen(grid);
          setCurrPF(null);
          break;
        case "RandomGrid":
          grid.resetGrid(gridSize, gridSize);
          algo = new GridRandom(grid);
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
    updatePFStats();
  }, [grid]);

  const updatePFStats = () => {
    const pf = currPFRef.current;
    if(!pf) return;

    setVisitedStat(pf.visitedCount);
    setPathStat(pf.pathCount);
    setRuntimeStat(pf.runTime);
  };

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
    mouseInputRef.current.grid = grid;
  }, [grid]);

  return (
    <div className='p-10 flex min-h-screen items-center justify-center bg-background gap-10'>
      <div className="flex flex-col items-center justify-center gap-10 w-full min-w-80 max-h-[70vh] max-w-[70vh]">
        <div className="text-sky-400 text-3xl font-bold">
          Pathfinding Visualizer
        </div>
        <div className="text-sky-200 text-xl font-bold">
          Vite · React · TailwindCSS · Netlify
        </div>
        <CanvasGrid 
          grid={grid} 
          mouseInput={mouseInputRef.current}
          onReRender={setGrid}
          onCellMove={runInstantPF}
          className="h-fit"
        />
      </div>
      <div className="w-fit h-auto flex  justify-center items-center ">
        <ControlPanel
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
    </div>
  )
}

export default App