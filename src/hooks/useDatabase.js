import { useState, useMemo } from 'react';

export function useDatabase({ currGridGenRef, currPFRef }) {
    const [recentRuns, setRecentRuns] = useState([]);
    const [shouldUpdateCharts, setShouldUpdateCharts] = useState(false);

    const postRun = async (data) => {
        try {
            const res = await fetch('/.netlify/functions/insertRun', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if(!res.ok) throw new Error(result.message);
            console.log("POST success:", result);
        } catch (err) {
            console.error("POST error:", err);
        }
    };

    const fetchRuns = async () => {
        const algoName = currPFRef.current?.getName?.();
        const gridName = currGridGenRef.current?.getName?.();
        if(!algoName || !gridName) return;

        try {
            const res = await fetch(`/.netlify/functions/getRuns?algorithm=${algoName}&grid=${gridName}`);
            const result = await res.json();
            console.log("GET success:", result);
            setRecentRuns([...result.data]);
        } catch (err) {
            console.error("GET error:", err);
        }
    }

    const refreshCharts = async () => {
        await fetchRuns();
        setShouldUpdateCharts(prev => !prev);
    }

    return {
        recentRuns, setRecentRuns,
        shouldUpdateCharts, setShouldUpdateCharts,
        postRun, fetchRuns, refreshCharts,
    };
}