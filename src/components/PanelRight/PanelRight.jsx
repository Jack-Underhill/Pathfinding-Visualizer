import { useRef, useEffect, useMemo, useState } from "react";
import React from "react";

import State from "./State";
import GraphCard from "./GraphCard";

import getChartData from '../../utils/getChartData';

const PanelRight = React.memo(function PanelRight({ isRunning, currGrid, currPF, recentRuns, shouldUpdateCharts }) {
    const [timeEffData, setTimeEffData] = useState([]);
    const [exploreEffData, setExploreEffData] = useState([]);

    useEffect(() => { 
        setTimeEffData(getChartData(recentRuns, 'path_steps', 'runtime_ms'));
        setExploreEffData(getChartData(recentRuns, 'grid_size', 'visited_steps'));
     }, [shouldUpdateCharts]);


    return (
        <>
            <div className={`flex-1/6`}>
                <State 
                    isRunning={isRunning}
                    currGrid={currGrid}
                    currPF={currPF}
                />
            </div>
            <div className={`flex-5/12`}>
                <GraphCard 
                    title="Time Efficiency"
                    data={timeEffData}
                    xLabel="Path Steps"
                    yLabel="Runtime (ms)"
                />
            </div>
            <div className={`flex-5/12`}>
                <GraphCard 
                    title="Explore Efficiency"
                    data={exploreEffData}
                    xLabel="Grid Size"
                    yLabel="Visited Cells"
                />
            </div>
        </>
    );
});

export default PanelRight;