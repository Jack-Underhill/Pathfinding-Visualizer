

function State({ isRunning, currGrid, currPF }) {
    const getStateName = () => {
        const gridName = currGrid?.getName?.();
        const pfName = currPF?.getName?.();

        if(gridName && pfName) 
            return `${gridName} + ${pfName}`;
        else if(gridName) 
            return `${gridName}`;
        else
            return "System";
    }

    const getState = () => {
        if(isRunning) {
            return "RUNNING";
        } else {
            return "IDLE";
        }
    }
    
    return (
        <>
            <div className="pt-2 text-center flex justify-center text-3xl font-bold text-sky-50">
                {getStateName()}
            </div>
            <div className="text-center flex justify-center text-4xl font-bold text-sky-50">
                {`${getState()}`}
            </div>
        </>
    );
}

export default State;