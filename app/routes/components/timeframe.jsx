
export default function Timeframe ({timeframe}) {
    return (
        //  <div className="flex">
            
        //     <button className="text-blue-600 p-4" onClick={() => timeframe('week')}>1WK</button>
        //     <button className="text-blue-600 p-4" onClick={() => timeframe(1)}>1M</button> 
        //     <button className="text-blue-600 p-4" onClick={() => timeframe(3)}>3M</button>
        //     <button className="text-blue-600 p-4" onClick={() => timeframe(6)}>6M</button>
        //     <button className="text-blue-600 p-4" onClick={() => timeframe(12)}>1Y</button>
        //     <button className="text-blue-600 p-4" onClick={() => timeframe('all')}>All</button> 
        // </div>

        <div className = "time-frame-container">
            <button className="time-frame-links" onClick={() => timeframe('week')}>1WK</button> 
            <button className="time-frame-links" onClick={() => timeframe(1)}>1M</button> 
            <button className="time-frame-links" onClick={() => timeframe(3)}>3M</button> 
            <button className="time-frame-links" onClick={() => timeframe(6)}>6M</button> 
            <button className="time-frame-links" onClick={() => timeframe(12)}>1Y</button> 
            <button className="time-frame-links" onClick={() => timeframe('all')}>All</button> 
        </div>
    )
}



