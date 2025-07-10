import { useMemo } from "react";
import React from "react";

import State from "./State";
import GraphCard from "./GraphCard";

function useStableChartData(data, xKey, yKey) {
    return useMemo(() => {
        if (!Array.isArray(data)) return [];

        const grouped = new Map();

        for (const row of data) {
            const xVal = row[xKey];
            const yVal = row[yKey];

            if (!grouped.has(xVal)) grouped.set(xVal, []);

            grouped.get(xVal).push(yVal);
        }

        const averaged = Array.from(grouped.entries()).map(([x, yList]) => ({
            x,
            y: yList.reduce((sum, y) => sum + y, 0) / yList.length,
        }));

        return averaged.sort((a, b) => a.x - b.x);
    }, [JSON.stringify(data), xKey, yKey]);
}

const PanelRight = React.memo(function PanelRight({ isRunning, currGrid, currPF, recentRuns }) {
    const card = 'rounded-2xl';
    const sectionCard = 'h-full flex flex-col gap-5 overflow-hidden bg-sky-800 ' + card;

    const timeEfficiencyData = useStableChartData(recentRuns, 'path_steps', 'runtime_ms', 'path_steps');
    const exploreEfficiencyData = useStableChartData(recentRuns, 'grid_size', 'visited_steps', 'grid_size');
    
    return (
        <>
            <div className={`${sectionCard} flex-1/6`}>
                <State 
                    isRunning={isRunning}
                    currGrid={currGrid}
                    currPF={currPF}
                />
            </div>
            <div className={`${sectionCard} flex-5/12`}>
                <GraphCard 
                    title="Time Efficiency"
                    data={timeEfficiencyData}
                    xLabel="Path Steps"
                    yLabel="Runtime (ms)"
                />
            </div>
            <div className={`${sectionCard} flex-5/12`}>
                <GraphCard 
                    title="Explore Efficiency"
                    data={exploreEfficiencyData}
                    xLabel="Grid Size"
                    yLabel="Visited Cells"
                />
            </div>
        </>
    );
});

PanelRight.displayName = "PanelRight";
export default PanelRight;