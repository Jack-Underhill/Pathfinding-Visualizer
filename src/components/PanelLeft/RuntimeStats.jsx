

function RuntimeStats({ pfCardClass, visitedCells, pathCells, runtime }) {
    const getRunTime = () => {
        if(runtime >= 1000) {
            return ((runtime / 1000).toFixed(4) + " s");
        } else {
            return (runtime.toFixed(2) + " ms");
        }
    }
    
    return (
        <div className={pfCardClass}>
            <div className="">
                Runtime Statistics
            </div>
            <div className="text-sm text-center">
                Visited Cells: {visitedCells}
            </div>
            <div className="text-sm text-center">
                Path Cells: {pathCells}
            </div>
            <div className="text-sm text-center">
                Runtime: {getRunTime()}
            </div>
        </div>
    );
}

export default RuntimeStats;