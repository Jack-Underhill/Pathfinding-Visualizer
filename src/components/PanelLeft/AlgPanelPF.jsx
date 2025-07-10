

function AlgPanelPF({ algClass, onRunAlgo, pfCardClass, enableGrids }) {

    
    return (
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
    );
}

export default AlgPanelPF;