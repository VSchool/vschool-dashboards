import { useState, useEffect } from 'react';
import SetTimeFrame from '../../../components/set-time-frame';

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
            <h1>All Stage 2 Records</h1>
            <SetTimeFrame setTimeFrame={setTimeFrame} />
            <br />
            <hr />
            <br />
            <div>
                <p>Active: {filteredRecords.length}</p>
                <p>Has Project: {filteredRecords.filter(fields => fields["Status"] === "In progress").length}</p>
                <p>Needs Project: {filteredRecords.filter(fields => fields["Status"] !== "In progress").length}</p>
                <p>Paid Projects: {filteredRecords.filter(fields => fields["Compensation Rate"]).length}</p>
                <p>Volunteer Project: {filteredRecords.filter(fields => !fields["Compensation Rate"]).length}</p>
                <p>Internships: {filteredRecords.filter(fields => fields["Type"] === "Internship").length}</p>
                <p>PT/Contract: {filteredRecords.filter(fields => fields["Type"] === "Contractor").length}</p>
            </div>
        </main>
    );
}