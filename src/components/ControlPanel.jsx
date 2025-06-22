import { useState } from 'react';

function ControlPanel({ onRunAlgo, onSpeedChange, onGridSizeChange, speed, gridSize }) {
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
            <div className={cardClass}>
                <div className="">
                    Animation Speed
                </div>
                <div className="text-sm text-center">
                    {speed} (ms/step)
                </div>
                <input 
                    type="range"
                    min={1}
                    max={500}
                    value={501 - speed}
                    step={1}
                    onChange={(e) => onSpeedChange(501 - Number(e.target.value))}
                    className="w-full accent-sky-400"
                />
                <div className="w-full flex justify-between text-sm ">
                    <span>Slow</span>
                    <span>Fast</span>
                </div>
            </div>
            <div className={gridCardClass}>
                <div className="">
                    Sizes
                </div>
                <div className="text-sm text-center">
                    {gridSize}x{gridSize}
                </div>
                <input 
                    type="range"
                    min={10}
                    max={100}
                    value={gridSize}
                    step={5}
                    onChange={(e) => onGridSizeChange(Number(e.target.value))}
                    className="w-full accent-sky-400"
                />
                
                <div className="">
                    Grid Generators
                </div>
                <button
                    onClick={() => {
                        onRunAlgo("OpenGrid")
                        enablePathfinders();
                    }}
                    className={algClass}
                >
                    Open
                </button>
                <button
                    onClick={() => {
                        onRunAlgo("RandomGrid")
                        enablePathfinders();
                    }}
                    className={algClass}
                >
                    Random
                </button>
                {/* <button
                    onClick={() => onRunAlgo("PrimsGrid")}
                    className={algClass}
                >
                    Prim's
                </button> */}
            </div>
            <div className={pfCardClass}>
                <div className="">
                    Pathfinders
                </div>
                <button
                    onClick={() => onRunAlgo("DFSPF")}
                    className={algClass}
                >
                    DFS
                </button>
                <button
                    onClick={() => onRunAlgo("BFSPF")}
                    className={algClass}
                >
                    BFS
                </button>
                {/* <button
                    onClick={() => onRunAlgo("AStarPF")}
                    className={algClass}
                >
                    A*
                </button>
                <button
                    onClick={() => onRunAlgo("SHPBFSPF")}
                    className={algClass}
                >
                    SHP BFS
                </button>
                <button
                    onClick={() => onRunAlgo("SHPAStarPF")}
                    className={algClass}
                >
                    SHP A*
                </button> */}
                <button
                    onClick={enableGrids}
                    className="bg-gray-900 py-0.5 px-3 w-fit rounded-full"
                >
                    Back
                </button>
            </div>
        </div>
    )
}

export default ControlPanel;