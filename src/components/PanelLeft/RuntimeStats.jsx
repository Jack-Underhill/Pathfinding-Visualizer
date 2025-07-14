import CardWrapper from "../CardWrapper";

function RuntimeStats({ gridSize, steppedCells, visitedCells, pathCells, runtime }) {
    const getRunTime = () => {
        if(runtime >= 1000) {
            return ((runtime / 1000).toFixed(4) + " s");
        } else {
            return (runtime.toFixed(3) + " ms");
        }
    }

    const getTotalCells = () => { return gridSize * gridSize; }

    const getEfficiency = (num, dem) => {
        return ((100 - (num / dem * 100)).toFixed(1) + "%");
    }
    
    return (
        <CardWrapper className='w-full h-full flex flex-col justify-evenly'>
            <div className="text-2xl font-semibold text-center text-[#FDA5D5]">
                Runtime Statistics
            </div>

            <div className="w-8/10 flex self-center justify-between space-x-10 text-xs text-left">
                <div className="flex-1 flex flex-col gap-2">
                    <div title="Total Grid Cells">
                        Total: <span className="text-sky-400">{getTotalCells()}</span>
                    </div> 
                    <div title="Path Cells">
                        Path: <span className="text-sky-400">{pathCells}</span>
                    </div> 
                    <div title="Total Steps">
                        Steps: <span className="text-sky-400">{steppedCells}</span>
                    </div>
                    <div title="Path Efficiency">
                        Efficiency: <span className="text-sky-400">{getEfficiency(pathCells, getTotalCells())}</span>
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <div title="Unvisited Cells">
                        Unvisited: <span className="text-sky-400">{getTotalCells() - visitedCells}</span>
                    </div>
                    <div title="Visited Cells">
                        Visited: <span className="text-sky-400">{visitedCells}</span>
                    </div>
                    <div title="Backtracked Steps">
                        Backtrack: <span className="text-sky-400">{steppedCells - visitedCells}</span>
                    </div>
                    <div title="Grid Visited Efficiency">
                        Efficiency: <span className="text-sky-400">{getEfficiency(visitedCells, getTotalCells())}</span>
                    </div>
                </div>
            </div>

            <div className="text-sm text-center">
                Runtime: <span className="text-sky-400">{getRunTime()}</span>
            </div>
        </CardWrapper>
    );
}

export default RuntimeStats;