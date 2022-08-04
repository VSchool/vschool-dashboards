import { useState, useEffect } from 'react';	
import SetTimeFrame from '../../../components/set-time-frame';	

export default function Dashboard(props) {	
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
    function isSelectedCourse(course){
        if(!props.abbreviation) return true
        return course === props.abbreviation
    }
    let medianSalary = getMedian(filteredRecords.filter(fields => fields['Compensation Rate'] && fields['Compensation Unit'] === 'Annual' && isSelectedCourse(['Course Subject'][0])), 'Compensation Rate');

    return (	
        <main>	
            <h1>{props.h1}</h1>	
            <SetTimeFrame setTimeFrame={setTimeFrame} />	
            <br />	
            <hr />	
            <br />	
            <div>	
                <p>Total Hired: {filteredRecords.filter(fields => isSelectedCourse(fields['Course Subject'][0])).length}</p>	
                <p>Median Salary: {medianSalary ? "$" +medianSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "Not Enough Data"}</p>	
            </div>	
        </main>	
    );	
}