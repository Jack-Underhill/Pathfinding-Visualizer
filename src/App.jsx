import { useState } from 'react'
// import { Grid } from "./logic/grid/Grid"
// import { Algorithms } from "./logic/Algorithms/Alg"
import CanvasGrid from "./components/CanvasGrid"
import ControlPanel from "./components/ControlPanel"
// import Alg from './logic/Algorithms/Alg'

function App() {
  // const [grid, setGrid] = useState(new Grid(25, 25))

  const handleRunStep = (algoName) => {
    // if(algoName === "OpenGrid") {
    //   Alg.OpenGrid(grid)
    // } else if(algoName === "DFSGrid") {
    //   Alg.DFSGrid(grid)
    // } else if(algoName === "PrimsGrid") {
    //   Alg.PrimsGrid(grid)
    // } else if(algoName === "DFSPF") {
    //   Alg.DFSPF(grid)
    // } else if(algoName === "BFSPF") {
    //   Alg.BFSPF(grid)
    // } else if(algoName === "AStarPF") {
    //   Alg.AStarPF(grid)
    // } else if(algoName === "SHPBFSPF") {
    //   Alg.SHPBFSPF(grid)
    // } else if(algoName === "SHPAStarPF") {
    //   Alg.SHPAStarPF(grid)
    // }
  }

  return (
    <div className='p-10 min-h-screen bg-background flex gap-10'>
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="text-sky-400 text-3xl font-bold">
          Pathfinding Visualizer
        </div>
        <div className="text-sky-200 text-xl font-bold">
          Vite · React · TailwindCSS · Netlify
        </div>
        <CanvasGrid />
      </div>
      <div className="w-fit h-auto">
        <ControlPanel onRunStep={handleRunStep} />
      </div>
    </div>
  )
}

export default App
