// import useGrid from "../hooks/useGrid"

function ControlPanel({ onRunAlgo, onSpeedChange, speed }) {
    let cardClass = "bg-sky-800 w-full p-5 text-center flex flex-col gap-3 text-sky-50 text-lg font-bold rounded-lg justify-center items-center";

    let algClass = "bg-sky-400 py-0.5 px-3 w-fit rounded-full"
    
    return (
        <div className="h-1/1 flex flex-col justify-center items-center gap-6">
            <div className={`${cardClass}`}>
                <div className="">
                    Grid Generators
                </div>
                <button
                    onClick={() => onRunAlgo("OpenGrid")}
                    className={algClass}
                >
                    Open
                </button>
                {/* <button
                    onClick={() => onRunAlgo("DFSGrid")}
                    className={algClass}
                >
                    DFS
                </button>
                <button
                    onClick={() => onRunAlgo("PrimsGrid")}
                    className={algClass}
                >
                    Prim's
                </button> */}
            </div>
            <div className={`${cardClass}`}>
                <div className="">
                    Pathfinders
                </div>
                {/* <button
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
                <button
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
            </div>
            <div className={`${cardClass}`}>
                <div className="">
                    Animation Speed
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
                <div className="text-sm text-center">
                    Speed: {speed} (ms/step)
                </div>
            </div>
        </div>
    )
}

export default ControlPanel;