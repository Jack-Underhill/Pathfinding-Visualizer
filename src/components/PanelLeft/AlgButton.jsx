

function AlgButton({ name, functionName, onRunAlgo, enablePathfinders }) {

    return (
        <button
            onClick={() => {
                onRunAlgo(functionName)
                if(enablePathfinders)
                    enablePathfinders();
            }}
            className="relative py-0.5 px-3 w-fit rounded-lg overflow-hidden group hover:scale-110"
        >
            <div className="absolute z-0 inset-0 rounded-lg animate-pulse group-hover:animate-none bg-sky-400" />

            <div className="relative z-10 text-white font-semibold">
                {name}
            </div>
        </button>
    );
}

export default AlgButton;