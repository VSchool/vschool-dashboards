import { useState, useEffect } from 'react';

export default function AllStage2Page() {
    const [ filteredRecords, setFilteredRecords ] = useState([]);
   
	useEffect(() => {
		setFilteredRecords(getLocal('stage2'))
	}, [])

    function getLocal(data){
        return JSON.parse(localStorage.getItem(data))
    }

    function setTimeFrame (timeframe){
		timeframe === 'all' ? setFilteredRecords(getLocal('stage2')) :
		setFilteredRecords(getLocal('stage2').filter(fields => {
			var d = fields["Course Start Date"] ? new Date(fields["Course Start Date"]) : new Date(fields["Created On"]);
			var f = new Date();
			f.toLocaleDateString();
			timeframe === 'week' ? f.setDate(f.getDate() - 7) : f.setMonth(f.getMonth() - timeframe);
			return d > f
		}))
	}

    return (
        <main>
            <h1>Stage 2 Design Records</h1>
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
                <p>Active: {filteredRecords.filter(fields => fields['Course Subject'][0] === 'XD').length}</p>
                <p>Has Project: {filteredRecords.filter(fields => fields["Status"] === "In progress" && fields['Course Subject'][0] === 'XD').length}</p>
                <p>Needs Project: {filteredRecords.filter(fields => fields["Status"] !== "In progress" && fields['Course Subject'][0] === 'XD').length}</p>
                <p>Paid Projects: {filteredRecords.filter(fields => fields["Compensation Rate"] && fields['Course Subject'][0] === 'XD').length}</p>
                <p>Volunteer Project: {filteredRecords.filter(fields => !fields["Compensation Rate"] && fields['Course Subject'][0] === 'XD').length}</p>
                <p>Internships: {filteredRecords.filter(fields => fields["Type"] === "Internship" && fields['Course Subject'][0] === 'XD').length}</p>
                <p>PT/Contract: {filteredRecords.filter(fields => fields["Type"] === "Contractor" && fields['Course Subject'][0] === 'XD').length}</p>
            </div>
        </main>
    );
}