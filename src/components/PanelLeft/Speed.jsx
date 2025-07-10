

function Speed({ cardClass, onSpeedChange, speed }) {

    
    return (
        <div className={cardClass}>
            <div className="">
                Animation Speed
            </div>
            <div className="text-sm text-center">
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
    );
}

export default Speed;