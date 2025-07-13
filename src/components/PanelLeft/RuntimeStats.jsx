import CardWrapper from "../CardWrapper";

function RuntimeStats({ visitedCells, pathCells, runtime }) {
    const getRunTime = () => {
        if(runtime >= 1000) {
            return ((runtime / 1000).toFixed(4) + " s");
        } else {
            return (runtime.toFixed(3) + " ms");
        }
    }
    
    return (
        <CardWrapper className='w-full h-full flex flex-col justify-evenly items-center'>
            <div className="text-2xl font-semibold">
                Runtime Statistics
            </div>
            <div className="flex flex-col gap-3 items">
                <div className="text-sm text-center">
                    Visited Cells: <span className="text-sky-400">{visitedCells}</span>
                </div>
                <div className="text-sm text-center">
                    Path Cells: <span className="text-sky-400">{pathCells}</span>
                </div>
                <div className="text-sm text-center">
                    Runtime: <span className="text-sky-400">{getRunTime()}</span>
                </div>
            </div>
        </CardWrapper>
    );
}

export default RuntimeStats;