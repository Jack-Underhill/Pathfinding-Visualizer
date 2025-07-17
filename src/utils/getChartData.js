function getChartData(data, xKey, yKey) {
    if (!Array.isArray(data)) return [];

    const grouped = new Map();

    for (const row of data) {
        const xVal = row[xKey];
        const yVal = row[yKey];

        if (!grouped.has(xVal)) grouped.set(xVal, []);

        grouped.get(xVal).push(yVal);
    }

    return Array.from(grouped.entries()).map(([x, yList]) => ({
        x,
        y: yList.reduce((sum, y) => sum + y, 0) / yList.length,
    })).sort((a, b) => a.x - b.x);
}

export default getChartData;