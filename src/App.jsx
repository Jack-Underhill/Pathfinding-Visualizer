import { useEffect, useRef, useState } from 'react';
import { Grid } from "./logic/grid/Grid";
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

  const gridSizeRef = useRef(gridSize);
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

  const startAlgo = async (algoName) => {
    if(!running) {
      let algo;
      
      switch(algoName) {
        case "OpenGrid":
          grid.resetGrid(gridSize, gridSize);
          algo = new GridOpen(grid);
          break;
        case "RandomGrid":
          grid.resetGrid(gridSize, gridSize);
          algo = new GridRandom(grid);
          break;
        // case "PrimsGrid":
        //   setAlgorithm(new GridPrims(grid));
        //   break;
        case "DFSPF":
          grid.resetPF();
          algo = new PFDFS(grid);
          break;
        case "BFSPF":
          grid.resetPF();
          algo = new PFBFS(grid);
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

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    gridSizeRef.current = gridSize;
  }, [gridSize]);

  return (
    <div className='p-10 min-h-screen bg-background flex flex-row  justify-center items-center gap-10'>
      <div className="flex flex-col justify-center items-center gap-10 w-full max-h-[70vh] min-w-80">
        <div className="text-sky-400 text-3xl font-bold">
          Pathfinding Visualizer
        </div>
        <div className="text-sky-200 text-xl font-bold">
          Vite · React · TailwindCSS · Netlify
        </div>
        <CanvasGrid 
          grid={grid} 
          onReRender={setGrid}
          className="w-full"
        />
      </div>
      <div className="w-fit h-auto flex  justify-center items-center ">
        <ControlPanel
          onRunAlgo={startAlgo}
          onSpeedChange={setSpeed}
          onGridSizeChange={setGridSize}
          speed={speed}
          gridSize={gridSize}
        />
      </div>
    </div>
  )
}

export default App
