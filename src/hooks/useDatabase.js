import { useState } from 'react';

export function useDatabase({ currGridGenRef, currPFRef }) {
    const [recentRuns, setRecentRuns] = useState([]);

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

            fetchRuns();
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
            setRecentRuns(result.data);
        } catch (err) {
            console.error("GET error:", err);
        }
    }

    return {
        recentRuns, setRecentRuns,
        postRun, fetchRuns,
    };
}