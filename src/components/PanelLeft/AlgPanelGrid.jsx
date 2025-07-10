

function AlgPanelGrid({ algClass, onRunAlgo, gridCardClass, enablePathfinders, onGridSizeChange, gridSize }) {

    
    return (
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
    );
}

export default AlgPanelGrid;