import { useLoaderData } from "@remix-run/react";
import { useState, useEffect } from 'react';

export const loader = async () => {
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');
    }

    return {
      records: JSON.parse(localStorage.getItem('AllStudentRecords')),
      progress: JSON.parse(localStorage.getItem('AllStudentProgress'))
    }
  };

export default function AllStage1Page() {
    const { records, progress } = useLoaderData();
	const [ filteredRecords, setFilteredRecords ] = useState([]);
    const [ filteredProgress, setFilteredProgress ] = useState([]);
    const [ filteredStage1, setFilteredStage1 ] = useState([]);

	useEffect(() => {
		setInitial()
	}, [])

	function setInitial (){
		setFilteredRecords(records)
		setFilteredProgress(progress)
		setFilteredStage1(getLocal('stage1'))
	}

    //////// GET MEDIAN COMPLETION /////////
    const medianComp = filteredProgress.filter(fields => fields['Level Number'] == 8 && fields['Status'] === 'Completed' && fields['Actual End Date'] && !isNaN(fields['Course Completed in Days']) && fields['Course Completed in Days'] > 0 && fields['Course Subject'][0] === 'FSJS' )

    //////// GET MEDIAN DAYS //////////
    const medianDays = filteredProgress.filter(fields => fields['Level Number'] > 0 && fields['Level Number'] < 7 && !isNaN(fields['Days in Level']) && fields['Days in Level'] > 0 && fields['Course Subject'][0] === 'FSJS')

    function getMedian(data, metric){
        const days = data.map(fields => fields[metric])
        days.sort( function(a,b) {return a - b;} );
        var half = Math.floor(data.length/2);
        return days.length % 2 ? days[half] : (days[half-1] + days[half]) / 2.0
    }

    function getLocal(data){
        return JSON.parse(localStorage.getItem(data))
    }

	function setTimeFrame (timeframe){
		if (timeframe === 'all') {
			setInitial()
		} else {
			selectData(setFilteredRecords, records, timeframe)
			selectData(setFilteredProgress, progress, timeframe)
			selectData(setFilteredStage1, getLocal('stage1'), timeframe)
		}
	}

	function selectData (setter, data, timeframe){
		setter(data.filter(fields => {
			var d = fields["Course Start Date"] ? new Date(fields["Course Start Date"]) : new Date(fields["Created On"]);
			var f = new Date();
			f.toLocaleDateString();
			timeframe === 'week' ? f.setDate(f.getDate() - 7) : f.setMonth(f.getMonth() - timeframe);
			return d > f
		}))
	}
     

    return (
        <main>
        <h1>All Stage 1 Development Records</h1>
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
            <p>Total Student Records: {filteredStage1.filter(fields => fields['Course Subject'] === 'FSJS').length}</p>
            <p>Active: {filteredStage1.filter(fields => fields["Simple Status"] === "In Progress" && fields['Course Subject'] === 'FSJS').length}</p>
            <p>Completed: {filteredRecords.filter(fields => ((fields["Simple Status"] === "Completed - Level 8" || fields["Simple Status"] === "Jobbed Out") && fields['Course Subject'] === 'FSJS')).length}</p>
            <p>Median Completion: {getMedian(medianComp, 'Course Completed in Days') ? getMedian(medianComp, 'Course Completed in Days') + ' Days': 'Not Enough Data'}</p>
            <p>Median Days per Level: {getMedian(medianDays, 'Days in Level') ? getMedian(medianDays, 'Days in Level') + ' Days' : 'Not Enough Data'}</p>
            <p>Started: {filteredStage1.filter(fields => fields["Simple Status"] === "In Progress" && fields['Course Subject'] === 'FSJS').length}</p> 
            <p>Paused: {filteredStage1.filter(fields => fields["Simple Status"] === "Paused" && fields['Course Subject'] === 'FSJS').length}</p>
            <p>Meaningful Progress: {filteredStage1.filter(fields => {
                var d = new Date(fields["Last Interaction Date"]);
                var f = new Date();
                f.toLocaleDateString();
                f.setMonth(f.getMonth() - 3);
                return fields["Simple Status"] === "In Progress" && d > f && fields['Course Subject'] === 'FSJS'
              }).length}</p>
            <p>Dropped: {filteredRecords.filter(fields => fields["Status"] === "Withdrew after add/drop deadline" && fields['Course Subject'] === 'FSJS').length}</p>
        </div>
        </main>
    );
}