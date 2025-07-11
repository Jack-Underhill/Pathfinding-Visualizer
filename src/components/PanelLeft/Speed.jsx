import CardWrapper from "../CardWrapper";

function Speed({ onSpeedChange, speed }) {

    
    return (
        <CardWrapper className='w-full h-full flex flex-col justify-evenly items-center'>
            <div className="text-2xl font-semibold">
                Animation Speed
            </div>

            <div className="w-8/10">
                <div className="text-md text-center mb-2">
                    {speed} (ms/step)
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
                <div className="w-full flex justify-between text-sm ">
                    <span>Slow</span>
                    <span>Fast</span>
                </div>
            </div>
        </CardWrapper>
    );
}

export default Speed;