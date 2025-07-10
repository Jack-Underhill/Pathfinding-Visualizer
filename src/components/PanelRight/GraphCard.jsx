import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Label,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';

export default function GraphCard({ title, xLabel, yLabel, data, xKey = "x", yKey = "y", gradientColor = '#00f5ff' }) {
    
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
            <div className="p-2 rounded-lg bg-[#0e1419] border border-cyan-400 text-white text-sm">
                <div>x: {label}</div>
                <div>y: {Number(payload[0].value).toFixed(3)} </div>
            </div>
            );
        }
        return null;
    };

    
    return (
        <div className='w-full h-full pt-4 pl-1 pb-10 pr-4 rounded-2xl bg-[0a0f14] border border-cyan-500 shadow-[0_0_20px_#00f5ff]'>
            <div className='text-center text-cyan-300 font-semibold tracking-wide text-lg mb-2'>
                {title.toUpperCase()}
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ bottom: 20 }}>
                    <defs>
                        <linearGradient id='glow' x1='0' y1='0' x2='0' y2='1'>
                            <stop offset='0%' stopColor={gradientColor} stopOpacity={0.9} />
                            <stop offset='100%' stopColor={gradientColor} stopOpacity={0.2} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid stroke='#1a1a1a' strokeDasharray="3 3" />
                    <XAxis dataKey={xKey} stroke="#4fc3f7">
                        <Label
                            value={xLabel}
                            position="bottom"
                            offset={0}
                            style={{ 
                                fill: '#0f5ff', 
                                fontSize: '1rem',
                                textAnchor: 'middle',
                            }}
                        />
                    </XAxis>
                    <YAxis stroke="#4fc3f7">
                        <Label
                            value={yLabel}
                            position="insideLeft"
                            angle={-90}
                            offset={10}
                            style={{ 
                                fill: '#0f5ff', 
                                fontSize: '1rem',
                                textAnchor: 'middle',
                            }}
                        />
                    </YAxis>
                    <Tooltip
                        content={<CustomTooltip />}
                        contentStyle={{
                            backgroundColor: '#0e1419',
                            borderColor: '#00f5ff',
                            borderRadius: '0.5rem',
                            color: '#fff',
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey={yKey}
                        stroke="url(#glow)"
                        strokeWidth={3}
                        dot={false}
                        isAnimationActive={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}