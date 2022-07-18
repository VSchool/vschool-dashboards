import { useLoaderData } from "@remix-run/react";
import { useEffect } from 'react';

export const loader = async () => {
    let localStorage
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');
    }

    return {
      records: JSON.parse(localStorage.getItem('AllStudentRecords')),
      progress: JSON.parse(localStorage.getItem('AllStudentProgress'))
    }
  };

export default function OutcomesOverview (){
    const { records, progress } = useLoaderData()

    function loadLocalStorage (){
        localStorage.setItem('stage1', JSON.stringify(records.filter(fields => fields['Current Level'] > 0 && fields['Current Level'] < 7)))
        localStorage.setItem('stage2', JSON.stringify(progress.filter(fields => fields['Level Number'] === 7  && (fields['Status'] === 'In progress' || fields['Status'] === 'Pending (Needs S2 project)')).filter((v,i,a)=>a.findIndex(v2=>(v2['Student Record'][0] === v['Student Record'][0]))===i)))
        localStorage.setItem('stage3', JSON.stringify(progress.filter(fields => fields['Level Number'] === 8  && fields['Status'] === 'Completed').filter((v,i,a)=>a.findIndex(v2=>(v2['Student Record'][0] === v['Student Record'][0]))===i)))
        localStorage.setItem('development', JSON.stringify(records.filter(fields => fields["Simple Status"] === "In Progress" && fields["Course Subject"] === "FSJS")))
        localStorage.setItem('design', JSON.stringify(records.filter(fields => fields["Simple Status"] === "In Progress" && fields["Course Subject"] === "XD")))
        localStorage.setItem('security', JSON.stringify(records.filter(fields => fields["Simple Status"] === "In Progress" && fields["Course Subject"] === "Security")))
        localStorage.setItem('blockchain', JSON.stringify(records.filter(fields => fields["Simple Status"] === "In Progress" && fields["Course Subject"] === "Blockchain")))
    }

    useEffect(()=> {
        loadLocalStorage()
    },[])

    return (
        <div>
            <h1>Overview Outcomes</h1>
            <button onClick={loadLocalStorage}>Refresh</button>
        </div>
    )
}