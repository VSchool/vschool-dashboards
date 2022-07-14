import { useState, useEffect } from 'react';

export default function AllStage3Page() {
    const [ filteredRecords, setFilteredRecords ] = useState([]);
   
	useEffect(() => {
		setFilteredRecords(getLocal('stage3'))
	}, [])

    function getLocal(data){
        return JSON.parse(localStorage.getItem(data))
    }

    function getMedian(data, metric){
        const days = data.map(fields => fields[metric])
        days.sort( function(a,b) {return a - b;} );
        var half = Math.floor(data.length/2);
        return days.length % 2 ? days[half] : (days[half-1] + days[half]) / 2.0
    }

    function setTimeFrame (timeframe){
		timeframe === 'all' ? setFilteredRecords(getLocal('stage3')) :
		setFilteredRecords(getLocal('stage3').filter(fields => {
			var d = new Date(fields["Created On"]);
			var f = new Date();
			f.toLocaleDateString();
			timeframe === 'week' ? f.setDate(f.getDate() - 7) : f.setMonth(f.getMonth() - timeframe);
			return d > f
		}))
	}

    let medianSalary = getMedian(filteredRecords.filter(fields => fields['Compensation Rate'] && fields['Compensation Unit'] === 'Annual'), 'Compensation Rate');

    return (
        <main>
            <h1>All Stage 3 Records</h1>
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
            <div>
                <p>Total Hired: {filteredRecords.length}</p>
                <p>Median Salary: {medianSalary ? "$" +medianSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "Not Enough Data"}</p>
            </div>
        </main>
    );
}