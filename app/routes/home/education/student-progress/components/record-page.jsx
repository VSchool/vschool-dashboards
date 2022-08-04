import { useLoaderData } from "@remix-run/react";
import { useState } from 'react';
import SetTimeFrame from "../../../components/set-time-frame";

export default function AllStudentProgressPage({abbreviation, h1}) {
    const { records, progress } = useLoaderData();
	const [ filteredRecords, setFilteredRecords ] = useState(records);
	const [ filteredProgress, setFilteredProgress ] = useState(progress);
    const [ paused, setPaused ] = useState(records.filter(fields => fields["Simple Status"] === "Paused"))

    if(!abbreviation) {
        
    }

    //////// GET MEDIAN COMPLETION /////////
    const medianComp = filteredProgress.filter(fields => fields['Level Number'] == 8 && fields['Status'] === 'Completed' && fields['Actual End Date'] && !isNaN(fields['Course Completed in Days']) && fields['Course Completed in Days'] > 0 )

    //////// GET MEDIAN DAYS //////////
    const medianDays = filteredProgress.filter(fields => fields['Level Number'] > 0 && fields['Level Number'] < 7 && !isNaN(fields['Days in Level']) && fields['Days in Level'] > 0)

    function getMedian(data, metric){
        const days = data.map(fields => fields[metric])
        days.sort( function(a,b) {return a - b;} );
        var half = Math.floor(data.length/2);
        return days.length % 2 ? days[half] : (days[half-1] + days[half]) / 2.0
    }

	function setTimeFrame (timeframe){
        if (timeframe === 'all') {
			setFilteredRecords(records)
			setFilteredProgress(progress)
            setPaused(records.filter(fields => fields["Simple Status"] === "Paused"))
		}else {
			setFilteredRecords(records.filter(fields => {
				var d = new Date(fields["Course Start Date"]);
				var f = new Date();
				f.toLocaleDateString();
				timeframe === 'week' ? f.setDate(f.getDate() - 7) : f.setMonth(f.getMonth() - timeframe);
				return d > f
			}))
			setFilteredProgress(progress.filter(fields => {
				var d = new Date(fields["Created On"]);
				var f = new Date();
				f.toLocaleDateString();
				timeframe === 'week' ? f.setDate(f.getDate() - 7) : f.setMonth(f.getMonth() - timeframe);
				return d > f
			}))
            setPaused(records.filter(fields => fields["Simple Status"] === "Paused" && (timeframe === 'week' ? fields['Time to Start'] < 7 : fields['Time to Start'] < (timeframe * 30))))
		}
    }
    
    return (
        <main>
            <h1>{h1}</h1>
			<SetTimeFrame setTimeFrame={setTimeFrame} />
			<br />
			<hr />
			<br />
            <div>
                <p>Total Student Records: {filteredRecords.length}</p>
                <p>Completed: {filteredRecords.filter(fields => fields["Simple Status"] === "Completed - Level 8" || fields["Simple Status"] === "Jobbed Out").length}</p>
                <p>Active: {filteredRecords.filter(fields => fields["Simple Status"] === "In Progress").length}</p>
                <p>Paused: {paused.length}</p>
                <p>Meaningful Progress: {filteredRecords.filter(fields => {
                    var d = new Date(fields["Last Interaction Date"]);
                    var f = new Date();
                    f.toLocaleDateString();
                    f.setMonth(f.getMonth() - 3);
                    return fields["Simple Status"] === "In Progress" && d > f
                  }).length}</p>
                <p>Dropped: {filteredRecords.filter(fields => fields["Simple Status"] === "Withdrew").length}</p>
                <p>Median Completion: {getMedian(medianComp, 'Course Completed in Days') ? getMedian(medianComp, 'Course Completed in Days') + ' Days': 'Not Enough Data'}</p>
                <p>Median Days per Level: {getMedian(medianDays, 'Days in Level') ? getMedian(medianDays, 'Days in Level') + ' Days' : 'Not Enough Data'}</p>
            </div>
        </main>
    );
}