import { useState } from 'react';

import Speed from './Speed';
import AlgPanelGrid from './AlgPanelGrid';
import AlgPanelPF from './AlgPanelPF';
import RuntimeStats from './RuntimeStats';

function PanelLeft({ onRunAlgo, onSpeedChange, onGridSizeChange, speed, gridSize, steppedCells, visitedCells, pathCells, runtime }) {    
    const [mode, setMode] = useState("grid");

    const enablePathfinders = () => setMode("pf");
    const enableGrids = () => setMode("grid");
    
    return (
        <div className="h-1/1 flex flex-col justify-center items-center gap-5">
            <Speed 
                onSpeedChange={onSpeedChange} 
                speed={speed}
            />

            {mode === "grid" && (
                <AlgPanelGrid 
                    onRunAlgo={onRunAlgo}
                    enablePathfinders={enablePathfinders}
                    onGridSizeChange={onGridSizeChange}
                    gridSize={gridSize}
                />
            )}

            {mode === "pf" && (
                <>
                    <AlgPanelPF 
                        onRunAlgo={onRunAlgo}
                        enableGrids={enableGrids}
                    />
                    
                    <RuntimeStats 
                        gridSize={gridSize}
                        steppedCells={steppedCells}
                        visitedCells={visitedCells}
                        pathCells={pathCells}
                        runtime={runtime}
                    />
                </>
            )}
        </div>
    );
}

export default PanelLeft;