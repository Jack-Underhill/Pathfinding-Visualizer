import AlgButton from './AlgButton'
import CardWrapper from '../CardWrapper';

function AlgPanelPF({ onRunAlgo, enableGrids }) {

    
    return (
        <CardWrapper className='w-full h-full flex flex-col justify-evenly items-center'>
            <div className="text-2xl font-semibold text-[#FDA5D5]">
                Pathfinders
            </div>

            <AlgButton 
                name="Depth First Search"
                functionName="DFSPF" 
                onRunAlgo={onRunAlgo}
            />
            <AlgButton 
                name="Breadth First Search"
                functionName="BFSPF" 
                onRunAlgo={onRunAlgo}
            />
            {/* <button
                onClick={() => onRunAlgo("AStarPF")}
                className={algClass}
            >
                A*
            </button>
            <button
                onClick={() => onRunAlgo("SHPBFSPF")}
                className={algClass}
            >
                SHP BFS
            </button>
            <button
                onClick={() => onRunAlgo("SHPAStarPF")}
                className={algClass}
            >
                SHP A*
            </button> */}

            <button
                onClick={enableGrids}
                className="py-0.5 px-3 w-[95%] rounded-sm bg-gray-900 text-[#FDA5D5] hover:scale-110"
            >
                Back
            </button>
        </CardWrapper>
    );
}

export default AlgPanelPF;