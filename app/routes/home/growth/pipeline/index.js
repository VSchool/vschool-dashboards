import { useState, useEffect } from 'react';

export default function Pipeline (){
    const [ allRecords, setAllRecords ] = useState([])
    const [ filteredRecords, setFilteredRecords ] = useState([])

    useEffect(() => {
        setAllRecords(getLocal('AllGrowthRecords'))
        setFilteredRecords(getLocal('AllGrowthRecords'))
    }, [])

    function getLocal(data){
       return JSON.parse(localStorage.getItem(data))
    }
    
    function setTimeFrame (timeframe){
        timeframe === 'all' ? setFilteredRecords(allRecords) :
        setFilteredRecords(allRecords.filter(fields => {
            var d = fields["Course Start Date"] ? new Date(fields["Course Start Date"]) : new Date(fields["Created"]);
            var f = new Date();
            f.toLocaleDateString();
            timeframe === 'week' ? f.setDate(f.getDate() - 7) : f.setMonth(f.getMonth() - timeframe);
            return d > f
        }))
    }


    return (
        <div>
            <h1>Pipeline</h1>
            <div className="flex">
                <button className="text-blue-600 p-4" onClick={() => setTimeFrame('all')}>All</button>
                <button className="text-blue-600 p-4" onClick={() => setTimeFrame('week')}>Week</button>
                <button className="text-blue-600 p-4" onClick={() => setTimeFrame(1)}>1 Month</button>
                <button className="text-blue-600 p-4" onClick={() => setTimeFrame(3)}>3 Month</button>
                <button className="text-blue-600 p-4" onClick={() => setTimeFrame(6)}>6 Month</button>
                <button className="text-blue-600 p-4" onClick={() => setTimeFrame(12)}>Year</button>
            </div>
            <br />
            <hr />
            <br />
            <p>Applications: {filteredRecords.length}</p>
            <p>Enrollments: {filteredRecords.filter(fields => fields["Admissions Status"] === "Started").length}</p>
            <p>Conversion Rate: {((filteredRecords.filter(fields => fields["Admissions Status"] === "Started").length / filteredRecords.length) * 100).toFixed(2)}%</p>
        </div>
    )
}