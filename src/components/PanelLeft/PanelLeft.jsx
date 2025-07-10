import { useState } from 'react';

import Speed from './Speed';
import AlgPanelGrid from './AlgPanelGrid';
import AlgPanelPF from './AlgPanelPF';
import RuntimeStats from './RuntimeStats';

function PanelLeft({ onRunAlgo, onSpeedChange, onGridSizeChange, speed, gridSize, visitedCells, pathCells, runtime }) {
    let cardClass = "bg-sky-800 w-full p-5 text-center flex flex-col gap-3 text-sky-50 text-lg font-bold rounded-lg justify-center items-center";
    let algClass = "bg-sky-400 py-0.5 px-3 w-fit rounded-full";

    const [gridCardClass, setGridCardClass] = useState(cardClass);
    const [pfCardClass, setPFCardClass] = useState(cardClass + " hidden");

    const enablePathfinders = () => {
        setGridCardClass(cardClass + " hidden");
        setPFCardClass(cardClass);
    }
    
    const enableGrids = () => {
        setGridCardClass(cardClass);
        setPFCardClass(cardClass + " hidden");
    }
    
    return (
        <div className="h-1/1 flex flex-col justify-center items-center gap-6">
            <Speed 
                cardClass={cardClass}
                onSpeedChange={onSpeedChange} 
                speed={speed}
            />

            <AlgPanelGrid 
                algClass={algClass}
                onRunAlgo={onRunAlgo}
                gridCardClass={gridCardClass}
                enablePathfinders={enablePathfinders}
                onGridSizeChange={onGridSizeChange}
                gridSize={gridSize}
            />

            <AlgPanelPF 
                algClass={algClass}
                onRunAlgo={onRunAlgo}
                pfCardClass={pfCardClass}
                enableGrids={enableGrids}
            />
            
            <RuntimeStats 
                pfCardClass={pfCardClass}
                visitedCells={visitedCells}
                pathCells={pathCells}
                runtime={runtime}
            />
        </div>
    )
}

export default PanelLeft;
    
    
    