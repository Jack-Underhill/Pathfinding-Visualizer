export const getHeadlessRuntime = async (pfInstance, gridRef, minRepeatThreshold = 1, repeatCount = 20) => {
    const runOnce = () => {
        const origGrid = gridRef.current.clone();
        origGrid.resetForPF();
        const tempPF = new pfInstance.constructor(origGrid);

        const start = performance.now();
        tempPF.runInstant();
        const end = performance.now();

        return end - start;
    };

    const firstRun = runOnce();

    if (firstRun < minRepeatThreshold) {
        let total = firstRun;
        for (let i = 1; i < repeatCount; i++) {
            total += runOnce();
        }
        return total / repeatCount;
    }

    return firstRun;
};