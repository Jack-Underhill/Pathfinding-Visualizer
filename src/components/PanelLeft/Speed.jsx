import CardWrapper from "../CardWrapper";

function Speed({ onSpeedChange, speed }) {
    const MIN_MS = 1;
    const MAX_MS = 1000;

    const toSliderVal = (ms) => {
        const logVal = Math.log(ms / MIN_MS) / Math.log(MAX_MS / MIN_MS);

        return 1 - logVal;
    }

    const fromSliderVal = (val) => {
        const inverted = 1 - val;

        return MIN_MS * Math.pow(MAX_MS / MIN_MS, inverted);
    }

    const convertToStepsPerSec = (ms) => {
        return 1000 / ms;
    }

    const addAccuracyToSmallVals = (val) => {
        if(val > 100) return Math.round(val);
        if(val > 10) return (val).toFixed(1);
        if(val > 3.14) return (val).toFixed(2);
        return (val).toFixed(3);
    }

    return (
        <CardWrapper className='w-full h-full flex flex-col justify-evenly items-center'>
            <div className="text-2xl font-semibold text-[#FDA5D5]">
                Animation Speed
            </div>

            <div className="w-8/10">
                <div className="text-md text-center mb-2">
                    {addAccuracyToSmallVals(convertToStepsPerSec(speed))} (steps/sec)
                </div>
                <div className="text-md text-center mb-2">
                    {addAccuracyToSmallVals(speed)} (ms/step)
                </div>
                <input 
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={toSliderVal(speed)}
                    onChange={(e) => {
                        const sliderVal = parseFloat(e.target.value);
                        const ms = fromSliderVal(sliderVal);
                        onSpeedChange(ms)
                    }}
                    className="w-full accent-sky-400"
                />
                <div className="w-full flex justify-between text-sm ">
                    <span>Slow</span>
                    <span>Fast</span>
                </div>
            </div>
        </CardWrapper>
    );
}

export default Speed;