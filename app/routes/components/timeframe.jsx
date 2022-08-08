
export default function Timeframe ({timeframe}) {
    return (
        <div className="flex">
            <button className="text-blue-600 p-4" onClick={() => timeframe('all')}>All</button>
            <button className="text-blue-600 p-4" onClick={() => timeframe('week')}>Week</button>
            <button className="text-blue-600 p-4" onClick={() => timeframe(1)}>1 Month</button>
            <button className="text-blue-600 p-4" onClick={() => timeframe(3)}>3 Month</button>
            <button className="text-blue-600 p-4" onClick={() => timeframe(6)}>6 Month</button>
            <button className="text-blue-600 p-4" onClick={() => timeframe(12)}>Year</button>
        </div>
    )
}



