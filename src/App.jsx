import { useVisualizerLogic } from "./hooks/useVisualizerLogic";

import CanvasGrid from "./components/CanvasGrid";
import NavBar from './components/NavBar';
import PanelRight from './components/PanelRight/PanelRight';
import PanelLeft from './components/PanelLeft/PanelLeft';

function App() {
  const {
        grid, setGrid, gridRef,
        gridSize, setGridSize, gridSizeRef,
        mouseInputRef,
        renderVersion, setRenderVersion,

        currGridGenRef, currPFRef,
        
        running, setRunning,
        speed, setSpeed, speedRef,
        startAlgo, runInstantPF,
        
        stepStat, setStepStat, stepStatRef,
        visitedStat, setVisitedStat, visitedStatRef,
        pathStat, setPathStat, pathStatRef,
        runtimeStat, setRuntimeStat, runtimeStatRef,
        updatePFStats, updateRuntimeStats,
        
        recentRuns, setRecentRuns,
        shouldUpdateCharts, setShouldUpdateCharts,
        postRun, fetchRuns, refreshCharts,
  } = useVisualizerLogic();


  return (
    <div 
      className='px-10 pt-10 pb-30 h-screen flex flex-col gap-10 bg-cover bg-center'
      style={{ backgroundImage: "url('/bg_starry-grid.png')" }}
    >
      <NavBar />

      <div className='h-full flex-1 flex gap-5 items-center justify-center'>
        <div className={`h-full rounded-2xl flex-1/5`}>
            <PanelLeft
              onRunAlgo={startAlgo}
              onSpeedChange={setSpeed}
              onGridSizeChange={setGridSize}
              speed={speed}
              gridSize={gridSize}
              steppedCells={stepStat}
              visitedCells={visitedStat}
              pathCells={pathStat}
              runtime={runtimeStat}
            />
        </div>
        <div className={`h-full rounded-2xl flex-1/2 flex flex-col justify-between gap-6`}>
          <div className="pb-2.5 text-center flex justify-center text-6xl font-bold text-gradient-bluepink">
            Pathfinding Visualizer
          </div>
          <div className='flex h-[70vh] items-center justify-center'>
            <CanvasGrid
              gridRef={gridRef}
              mouseInput={mouseInputRef.current}
              renderVersion={renderVersion}
              setRenderVersion={setRenderVersion}
              onCellMove={runInstantPF}
              className="h-fit"
            />
          </div>
        </div>
        <div className={`h-full rounded-2xl flex-1/3 flex flex-col gap-5`}>
            <PanelRight 
              isRunning={running}
              currGrid={currGridGenRef.current}
              currPF={currPFRef.current}
              recentRuns={recentRuns}
              shouldUpdateCharts={shouldUpdateCharts}
            />
        </div>
      </div>
    </div>
  )
}

export default App