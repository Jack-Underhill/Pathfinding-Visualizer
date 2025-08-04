import AlgButton from './AlgButton'
import CardWrapper from '../CardWrapper';

function AlgPanelGrid({ onRunAlgo, enablePathfinders, onGridSizeChange, gridSize }) {

    
    return (
        <CardWrapper className='w-full h-full flex flex-col justify-evenly items-center'>
            <div className="text-2xl font-semibold text-[#FDA5D5]">
                Grid Generators
            </div>

            <div className='flex flex-col items-center gap-5'>
                <AlgButton 
                    name="Open"
                    functionName="OpenGrid" 
                    onRunAlgo={onRunAlgo}
                    enablePathfinders={enablePathfinders}
                />
                <AlgButton 
                    name="Random"
                    functionName="RandomGrid" 
                    onRunAlgo={onRunAlgo}
                    enablePathfinders={enablePathfinders}
                />
                <AlgButton 
                    name="Hunt & Kill"
                    functionName="HuntAndKillGrid" 
                    onRunAlgo={onRunAlgo}
                    enablePathfinders={enablePathfinders}
                />
                <AlgButton 
                    name="Prim's"
                    functionName="PrimsGrid" 
                    onRunAlgo={onRunAlgo}
                    enablePathfinders={enablePathfinders}
                />
            </div>

            {/* divider */}
            <div className='border w-6/10 border-sky-800' />

            <div className="text-2xl font-semibold">
                Sizes
            </div>
            
            <div className='w-8/10'>
                <div className="text-md text-center">
                    {gridSize}x{gridSize}
                </div>
                <input 
                    type="range"
                    min={10}
                    max={100}
                    value={gridSize}
                    step={5}
                    onChange={(e) => onGridSizeChange(Number(e.target.value))}
                    className="w-full accent-sky-400"
                />
            </div>
        </CardWrapper>
    );
}

export default AlgPanelGrid;