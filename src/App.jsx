import { useEffect, useRef, useState } from 'react';
import { Grid } from "./logic/grid/Grid";
import { GridOpen } from "./logic/Algorithms/maze/GridOpen";
import { PFDFS } from './logic/Algorithms/pathfind/PFDFS';
import CanvasGrid from "./components/CanvasGrid";
import ControlPanel from "./components/ControlPanel";

function App() {
  const [grid, setGrid] = useState(new Grid(25, 25));
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(100);
  const speedRef = useRef(speed);

  const runAlgo = (algo) => {
    if(!algo || algo.isDone()) {
      setRunning(false);
      return;
    }

    algo.step();
    setGrid(Object.assign(Object.create(Object.getPrototypeOf(grid)), grid));
    setTimeout(() => runAlgo(algo), speedRef.current);
  }

  const startAlgo = (algoName) => {
    if(!running) {
      let algo;
      
      switch(algoName) {
        case "OpenGrid":
          grid.resetGrid();
          algo = new GridOpen(grid);
          break;
        // case "DFSGrid":
        //   setAlgorithm(new GridDFS(grid));
        //   break;
        // case "PrimsGrid":
        //   setAlgorithm(new GridPrims(grid));
        //   break;
        case "DFSPF":
          grid.resetPF();
          algo = new PFDFS(grid);
          break;
        // case "BFSPF":
        //   setAlgorithm(new PFBFS(grid));
        //   break;
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

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  return (
    <div className='p-10 min-h-screen bg-background flex justify-center items-center gap-10'>
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="text-sky-400 text-3xl font-bold">
          Pathfinding Visualizer
        </div>
        <div className="text-sky-200 text-xl font-bold">
          Vite · React · TailwindCSS · Netlify
        </div>
        <CanvasGrid grid={grid} onReRender={setGrid}/>
      </div>
      <div className="w-fit h-auto">
        <ControlPanel onRunAlgo={startAlgo} onSpeedChange={setSpeed} speed={speed} />
      </div>
    </div>
  )
}

export default App
