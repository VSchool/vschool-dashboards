import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import SetTimeFrame from "../../components/set-time-frame";

export const loader = async () => {
	let localStorage
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');
    }

    return {
      records: JSON.parse(localStorage.getItem('AllStudentRecords'))
    }
  };

export default function OutcomesIndex (){
    const { records } = useLoaderData()
	const [ filteredRecords, setFilteredRecords ] = useState(records);
	const [ filteredStage1, setFilteredStage1 ] = useState([]);
	const [ filteredStage2, setFilteredStage2 ] = useState([]);
	const [ filteredStage3, setFilteredStage3 ] = useState([]);
	const [ filteredDevelopment, setFilteredDevelopment ] = useState([]);
	const [ filteredDesign, setFilteredDesign ] = useState([]);
	const [ filteredSecurity, setFilteredSecurity ] = useState([]);
	const [ filteredBlockchain, setFilteredBlockchain ] = useState([]);

	useEffect(() => {
		setInitial()
	}, [])

	function setInitial (){
		setFilteredRecords(records)
		setFilteredStage1(getLocal('stage1'))
		setFilteredStage2(getLocal('stage2'))
		setFilteredStage3(getLocal('stage3'))
		setFilteredDevelopment(getLocal('development'))
		setFilteredDesign(getLocal('design'))
		setFilteredSecurity(getLocal('security'))
		setFilteredBlockchain(getLocal('blockchain'))
	}

    function getLocal(data){
       return JSON.parse(localStorage.getItem(data))
    }

    function setTimeFrame (timeframe){
      if (timeframe === 'all') {
		setInitial()
	  } else {
		selectData(setFilteredRecords, records, timeframe)
		selectData(setFilteredStage1, getLocal('stage1'), timeframe)
		selectData(setFilteredStage2, getLocal('stage2'), timeframe)
		selectData(setFilteredStage3, getLocal('stage3'), timeframe)
		selectData(setFilteredDevelopment, getLocal('development'), timeframe)
		selectData(setFilteredDesign, getLocal('design'), timeframe)
		selectData(setFilteredSecurity, getLocal('security'), timeframe)
		selectData(setFilteredBlockchain, getLocal('blockchain'), timeframe)
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
        <div>
            <h1>Outcomes Overview</h1>
			<SetTimeFrame setTimeFrame={setTimeFrame} />
			<br />
			<hr />
			<br />
            <p>Stage 1: {filteredStage1.length}</p>
            <p>Stage 2: {filteredStage2.length}</p>
            <p>Stage 3: {filteredStage3.length}</p>
            <p>Enrollments: {filteredRecords.filter(fields => fields["Admissions Status"] === "Started").length}</p>
            <p>Stage 1 Completions: {filteredStage2.length}</p>
            <p>Hired: {filteredStage3.length}</p>
            <br />
            <hr />
            <br />
            <p>Development: {filteredDevelopment.length}</p>
            <p>Design: {filteredDesign.length}</p>
            <p>Security: {filteredSecurity.length}</p>
            <p>Blockchain: {filteredBlockchain.length}</p>
        </div>
    )
}