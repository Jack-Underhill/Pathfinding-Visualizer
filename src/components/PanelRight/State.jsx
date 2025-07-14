import CardWrapper from "../CardWrapper";

function State({ isRunning, currGrid, currPF }) {
    const nameClass = "flex-1 underline underline-offset-3";

    const getGridName = () => {
        const gridName = currGrid?.getName?.();

        if(gridName) 
            return (
                <div className={`${nameClass} text-sky-300`} title="Grid Generation Algorithm">
                    {gridName}
                </div>
            );
        else
            return (<>Visualizer System</>);
    } 

    const getPFName = () => {
        const pfName = currPF?.getName?.();

        if(pfName) 
            return (
                <div className={`${nameClass} text-pink-300`} title="Pathfinder Algorithm">
                    {pfName}
                </div>
            );
        else
            return (<></>);
    } 

    const getState = () => {
        const state = isRunning ? "RUNNING" : "IDLE";
        const color = isRunning ? "text-[#49ff94]" : "text-[#ff4f4f]";

        return (
            <div className={`${color}`} title="Visualizer Animation State">
                {state}
            </div>
        );
    }
    
    return (
        <CardWrapper className='w-full h-full flex flex-col justify-evenly'>
            <div className="text-center flex justify-evenly gap-4 text-xl font-bold text-sky-50">
                {getGridName()}
                {getPFName()}
            </div>
            
            <div className="text-center flex justify-center text-3xl font-bold">
                {getState()}
            </div>
        </CardWrapper>
    );
}

export default State;