import {useState, createContext} from 'react'
import {useLoaderData} from '@remix-run/react'

const Context = createContext()

function DataContextProvider(props) {
    const [ filteredRecords, setFilteredRecords ] = useState([]);
    const [ filteredProgress, setFilteredProgress ] = useState([]);
    const [ filteredStage1, setFilteredStage1 ] = useState([]);
	const [ filteredStage2, setFilteredStage2 ] = useState([]);
	const [ filteredStage3, setFilteredStage3 ] = useState([]);
    const [ growthRecords, setGrowthRecords ] = useState([])
    
    let { records, progress } = useLoaderData();

    if(!records) {
        records = []
    }

    const [ paused, setPaused ] = useState(records.filter(fields => fields["Simple Status"] === "Paused"))

    const medianComp = progress && filteredProgress.filter(fields => fields['Level Number'] == 8 && fields['Status'] === 'Completed' && fields['Actual End Date'] && !isNaN(fields['Course Completed in Days']) && fields['Course Completed in Days'] > 0 )
    const medianDays = progress && filteredProgress.filter(fields => fields['Level Number'] > 0 && fields['Level Number'] < 7 && !isNaN(fields['Days in Level']) && fields['Days in Level'] > 0)
    const medianSalary = getMedian(filteredStage3.filter(fields => fields['Compensation Rate'] && fields['Compensation Unit'] === 'Annual'), 'Compensation Rate');

    ///////// EDUCATION ///////////
    function getMedian(data, metric){
        const days = data.map(fields => fields[metric])
        days.sort( function(a,b) {return a - b;} );
        var half = Math.floor(data.length/2);
        return days.length % 2 ? days[half] : (days[half-1] + days[half]) / 2.0
    }
    
	function setInitialOutcomes (course){
        setFilteredStage1(getLocal('stage1').filter(fields => course ? fields['Course Subject'] === course : fields))
        setFilteredStage2(getLocal('stage2').filter(fields => course ? (fields["Course Subject"] && fields["Course Subject"][0] === course) : fields))
        setFilteredStage3(getLocal('stage3').filter(fields => course ? (fields["Course Subject"] && fields["Course Subject"][0] === course) : fields))
    }
    function setInitialEducation (course){
        setFilteredRecords(records.filter(fields => course ? fields["Course Subject"] === course : fields))
        progress && setFilteredProgress(progress.filter(fields => course ? (fields["Course Subject"] && fields["Course Subject"][0] === course) : fields))
        setPaused(records.filter(fields => course ? fields["Simple Status"] === "Paused" && fields["Course Subject"] === course : fields["Simple Status"] === "Paused"))
    }
    function setInitialGrowth(){
       setGrowthRecords(getLocal('AllGrowthRecords'))
	}

    function getLocal(data){
        return JSON.parse(localStorage.getItem(data))
     }

    function setTimeFrame (timeframe, course, page, dept){
        const courseRecords = course && records ? records.filter(fields => fields['Course Subject'] === course) : records
        const courseProgress = course && progress ? progress.filter(fields => fields["Course Subject"] && fields["Course Subject"][0] === course) : progress
        const courseStage1 = course ? getLocal('stage1').filter(fields => fields['Course Subject'] === course) : getLocal('stage1')
        const courseStage2 = course ? getLocal('stage2').filter(fields => fields["Course Subject"] && fields["Course Subject"][0] === course) : getLocal('stage2')
        const courseStage3 = course ? getLocal('stage3').filter(fields => fields["Course Subject"] && fields["Course Subject"][0] === course) : getLocal('stage3')
        if (timeframe === 'all') {
            console.log(course)
            //if else block for course, calling setInitialEducation, setInitialGrowth, or setInitialOutcomes
			//setInitial()
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
        <Context.Provider value={{
            filteredRecords, 
            filteredProgress, 
            filteredStage1, 
            filteredStage2, 
            filteredStage3, 
            medianComp, 
            medianDays, 
            medianSalary, 
            growthRecords, 
            paused, 
            setTimeFrame, 
            setInitialGrowth, 
            setInitialOutcomes, 
            setInitialEducation
        }}>
            {props.children}
        </Context.Provider>
    )
  
}

export { DataContextProvider, Context };