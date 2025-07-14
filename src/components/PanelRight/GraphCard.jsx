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

import CardWrapper from '../CardWrapper';

export default function GraphCard({ title, xLabel, yLabel, data, xKey = "x", yKey = "y", gradientColor = '#00f5ff' }) {
    
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
            <div className="p-2 rounded-lg bg-[#0e1419] border border-sky-400 text-white text-sm">
                <div>x: {label}</div>
                <div>y: {Number(payload[0].value).toFixed(3)} </div>
            </div>
            );
        }
        return null;
    };

    
    return (
        <CardWrapper className='w-full h-full'>
            <div className='w-full h-full pt-2 pl-1 pb-10 pr-4'>
                <div className='text-center text-[#FDA5D5] font-semibold tracking-wide text-lg mb-4'>
                    {title.toUpperCase()}
                </div>

                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ bottom: 20, left: 10 }}>
                        <defs>
                            <linearGradient id='glow' x1='0' y1='0' x2='1' y2='0'>
                                <stop offset='0%' stopColor="#00F5FF" /> 
                                <stop offset='100%' stopColor="#FF4AC9" />
                            </linearGradient>
                        </defs>

                        <CartesianGrid stroke='#1a1a1a' strokeDasharray="3 3" />
                        <XAxis dataKey={xKey} stroke="#4fc3f7">
                            <Label
                                value={xLabel}
                                position="bottom"
                                offset={0}
                                style={{ 
                                    fill: '#FDA5D5', 
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
                                offset={0}
                                style={{ 
                                    fill: '#FDA5D5', 
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
        </CardWrapper>
    );
}