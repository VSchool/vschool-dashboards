import { useEffect } from 'react';
import { useState } from 'react';
import Timeframe from '../components/timeframe';


export default function DisplayData ({records, progress, page, title, dept, course}) {
	const [ filteredRecords, setFilteredRecords ] = useState([]);
    const [ filteredProgress, setFilteredProgress ] = useState([]);
    const [ filteredStage1, setFilteredStage1 ] = useState([]);
	const [ filteredStage2, setFilteredStage2 ] = useState([]);
	const [ filteredStage3, setFilteredStage3 ] = useState([]);
    const [ growthRecords, setGrowthRecords ] = useState([])

    if(!records) {
        records = []
    }

    const [ paused, setPaused ] = useState(records.filter(fields => fields["Simple Status"] === "Paused"))

    const medianComp = progress && filteredProgress.filter(fields => fields['Level Number'] == 8 && fields['Status'] === 'Completed' && fields['Actual End Date'] && !isNaN(fields['Course Completed in Days']) && fields['Course Completed in Days'] > 0 )
    const medianDays = progress && filteredProgress.filter(fields => fields['Level Number'] > 0 && fields['Level Number'] < 7 && !isNaN(fields['Days in Level']) && fields['Days in Level'] > 0)
    const medianSalary = getMedian(filteredStage3.filter(fields => fields['Compensation Rate'] && fields['Compensation Unit'] === 'Annual'), 'Compensation Rate');

    useEffect(() => {
        setInitial()
    }, [])

    ///////// EDUCATION ///////////
    function getMedian(data, metric){
        const days = data.map(fields => fields[metric])
        days.sort( function(a,b) {return a - b;} );
        var half = Math.floor(data.length/2);
        return days.length % 2 ? days[half] : (days[half-1] + days[half]) / 2.0
    }

	function setInitial (){
        setFilteredRecords(records.filter(fields => course ? fields["Course Subject"] === course : fields))
        progress && setFilteredProgress(progress.filter(fields => course ? (fields["Course Subject"] && fields["Course Subject"][0] === course) : fields))
        if (dept === 'outcomes'){
            setFilteredStage1(getLocal('stage1').filter(fields => course ? fields['Course Subject'] === course : fields))
            setFilteredStage2(getLocal('stage2').filter(fields => course ? (fields["Course Subject"] && fields["Course Subject"][0] === course) : fields))
            setFilteredStage3(getLocal('stage3').filter(fields => course ? (fields["Course Subject"] && fields["Course Subject"][0] === course) : fields))
        }
        if (dept === 'education' || (dept === 'outcomes' && page === 'stage1')){
            setPaused(records.filter(fields => course ? fields["Simple Status"] === "Paused" && fields["Course Subject"] === course : fields["Simple Status"] === "Paused"))
        }
        dept === 'growth' && setGrowthRecords(getLocal('AllGrowthRecords'))
	}

    function getLocal(data){
        return JSON.parse(localStorage.getItem(data))
     }

    function setTimeFrame (timeframe){
        const courseRecords = course && records ? records.filter(fields => fields['Course Subject'] === course) : records
        const courseProgress = course && progress ? progress.filter(fields => fields["Course Subject"] && fields["Course Subject"][0] === course) : progress
        const courseStage1 = course ? getLocal('stage1').filter(fields => fields['Course Subject'] === course) : getLocal('stage1')
        const courseStage2 = course ? getLocal('stage2').filter(fields => fields["Course Subject"] && fields["Course Subject"][0] === course) : getLocal('stage2')
        const courseStage3 = course ? getLocal('stage3').filter(fields => fields["Course Subject"] && fields["Course Subject"][0] === course) : getLocal('stage3')

        if (timeframe === 'all') {
			setInitial()
		}else {
            selectData(setFilteredRecords, courseRecords, timeframe, 'Course Start Date')
			progress && selectData(setFilteredProgress, courseProgress, timeframe, 'Created On')
            if (dept === 'education' || (dept === 'outcomes' && page === 'stage1')){
                setPaused(courseRecords.filter(fields => fields["Simple Status"] === "Paused" && (timeframe === 'week' ? fields['Time to Start'] < 7 : fields['Time to Start'] < (timeframe * 30))))
            }
            if(dept === 'outcomes'){
                selectData(setFilteredStage1, courseStage1, timeframe, 'Course Start Date')
                selectData(setFilteredStage2, courseStage2, timeframe, 'Created On')
                selectData(setFilteredStage3, courseStage3, timeframe, 'Created On')
            }
            dept === 'growth' && selectData(setGrowthRecords, getLocal('AllGrowthRecords'), timeframe, 'Course Start Date')
		}
    }

    function selectData (setter, data, timeframe, property){
		setter(data.filter(fields => {
			var d = fields[property] ? new Date(fields[property]) : new Date(fields["Created"]);
			var f = new Date();
			f.toLocaleDateString();
			timeframe === 'week' ? f.setDate(f.getDate() - 7) : f.setMonth(f.getMonth() - timeframe);
			return d > f
		}))
	}


    return (
        <>
            <h1>{title}</h1>
            <Timeframe timeframe={setTimeFrame} />
            <br />
            <hr />
            <br />
            <div>
                {(dept === 'education' || (dept === 'outcomes' && page === 'stage1')) && 
                    <>
                        <p>Total Student Records: {filteredRecords.length}</p>
                        <p>Completed: {filteredRecords.filter(fields => fields["Simple Status"] === "Completed - Level 8" || fields["Simple Status"] === "Jobbed Out").length}</p>
                        <p>Active: {filteredRecords.filter(fields => fields["Simple Status"] === "In Progress").length}</p>
                        <p>Paused: {paused.length}</p>
                        {dept === 'outcomes' && <p>Started: {filteredStage1.filter(fields => fields["Simple Status"] === "In Progress").length}</p>}
                        <p>Meaningful Progress: {filteredRecords.filter(fields => {
                            var d = new Date(fields["Last Interaction Date"]);
                            var f = new Date();
                            f.toLocaleDateString();
                            f.setMonth(f.getMonth() - 3);
                            return fields["Simple Status"] === "In Progress" && d > f
                        }).length}</p>
                        <p>Dropped: {filteredRecords.filter(fields => fields["Simple Status"] === "Withdrew").length}</p>
                        {progress && <>
                            <p>Median Completion: {getMedian(medianComp, 'Course Completed in Days') ? getMedian(medianComp, 'Course Completed in Days') + ' Days': 'Not Enough Data'}</p>
                            <p>Median Days per Level: {getMedian(medianDays, 'Days in Level') ? getMedian(medianDays, 'Days in Level') + ' Days' : 'Not Enough Data'}</p>
                        </>}
                    </>
                }

                {dept === 'growth' && 
                    <>
                        <p>Applications: {growthRecords.length}</p>
                        <p>Enrollments: {growthRecords.filter(fields => fields["Admissions Status"] === "Started").length}</p>
                        <p>Conversion Rate: {((growthRecords.filter(fields => fields["Admissions Status"] === "Started").length / growthRecords.length) * 100).toFixed(2)}%</p>
                    </>
                }

                {(dept === 'outcomes' && page === 'overview') &&
                    <>
                        <p>Stage 1: {filteredStage1.length}</p>
                        <p>Stage 2: {filteredStage2.length}</p>
                        <p>Stage 3: {filteredStage3.length}</p>
                        <p>Enrollments: {filteredRecords.filter(fields => fields["Admissions Status"] === "Started").length}</p>
                        <p>Stage 1 Completions: {filteredStage2.length}</p>
                        <p>Hired: {filteredStage3.length}</p>
                    </>
                }

                {page === 'stage2' && 
                    <>
                        <p>Active: {filteredStage2.length}</p>
                        <p>Has Project: {filteredStage2.filter(fields => fields["Status"] === "In progress").length}</p>
                        <p>Needs Project: {filteredStage2.filter(fields => fields["Status"] !== "In progress").length}</p>
                        <p>Paid Projects: {filteredStage2.filter(fields => fields["Compensation Rate"]).length}</p>
                        <p>Volunteer Project: {filteredStage2.filter(fields => !fields["Compensation Rate"]).length}</p>
                        <p>Internships: {filteredStage2.filter(fields => fields["Type"] === "Internship").length}</p>
                        <p>PT/Contract: {filteredStage2.filter(fields => fields["Type"] === "Contractor").length}</p>
                    </>
                }

                {page === 'stage3' && 
                    <>
                        <p>Total Hired: {filteredStage3.length}</p>
                        <p>Median Salary: {medianSalary ? "$" +medianSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "Not Enough Data"}</p>
                    </>
                }
                
                <br />
                <hr />
                <br />

                {page === 'overview' && <>
                    <p>Development: {filteredRecords.filter(fields => fields["Simple Status"] === "In Progress" && fields["Course Subject"] === "FSJS").length}</p>
                    <p>Design: {filteredRecords.filter(fields => fields["Simple Status"] === "In Progress" && fields["Course Subject"] === "XD").length}</p>
                    <p>Security: {filteredRecords.filter(fields => fields["Simple Status"] === "In Progress" && fields["Course Subject"] === "Security").length}</p>
                    <p>Blockchain: {filteredRecords.filter(fields => fields["Simple Status"] === "In Progress" && fields["Course Subject"] === "Blockchain").length}</p>
                </>}

            </div>
        </>
    )
}
   
                