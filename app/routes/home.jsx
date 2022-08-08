import { useEffect, useState } from "react";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";

// import { requireUserId } from "~/session.server";
import { getData } from "../models/airtable.server";
import { useUser } from "~/utils";

export const loader = async ({ request }) => {
    let localStorage
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');
    }

	await getData({
		pageName: 'AllStudentRecords',
		pageBase: "appRCE5sPrn56fpvC",
		pageTable: "tblLI0BswFWDNUrq6",
		pageFormula: "AND(NOT({Simple Status} = 'Not RLM'), NOT({Admissions Status} = ''))",
		pageFields: ["Admissions Status", "Course Start Date", "Course Subject", "Current Level", "Last Interaction Date", "Simple Status", "Student Name", "Time to Start" ]
	})
	await getData({
		pageName: 'AllStudentProgress',
		pageBase: "appRCE5sPrn56fpvC",
		pageTable: "tblFhb879oExYkEzQ",
		pageFormula: "",
		pageFields: ['Actual End Date', 'Compensation Rate', 'Compensation Unit', 'Course Completed in Days', 'Course Subject', 'Created On','Days in Level', 'Level Number', 'Start Date', 'Status', 'Student Record', 'Type' ]
	})
	await getData({
		pageName: 'AllCampaignData',
		pageBase: "appRCE5sPrn56fpvC",
		pageTable: "tblLI0BswFWDNUrq6",
		pageFormula: "NOT({Admissions Status} = '')",
		pageFields: ["Admissions Status", "Campaign Medium", "Campaign Name", "Campaign Source", "Course Start Date", "Contact Name"]
	})
	await getData({
		pageName: 'AllScholarshipData',
		pageBase: "appDtw82NJafLsLdO",
		pageTable: "tblPXgXCQ2rj6d5e9",
		pageFormula: "",
		pageFields: ["Created", "Name", "Scholarship Name", "UTM Campaign", "UTM Content", "UTM Medium", "UTM Source"]
	})

	return {
        campaign: JSON.parse(localStorage.getItem('AllCampaignData')),
        scholarship: JSON.parse(localStorage.getItem('AllScholarshipData')),
        records: JSON.parse(localStorage.getItem('AllStudentRecords')),
        progress: JSON.parse(localStorage.getItem('AllStudentProgress'))
    };
};

export default function HomePage() {
    const user = useUser();
    const [ initialData, setInitialData ] = useState(true)
    const { campaign, scholarship, records, progress } = useLoaderData()
    
    function loadLocalStorage (){
        const duplicates = [];
        const campNoDupes = [];
        campaign.forEach((item) => {
        const found = scholarship.find(field => item['Contact Name'] && item['Contact Name'][0] == field['Name']);
        found ? duplicates.push({ ...item,...found }) : campNoDupes.push(item)
        })
        const scholNoDupes = scholarship.filter((item) => !duplicates.find(field => item['Name'] == field['Name']))
        localStorage.setItem('AllGrowthRecords', JSON.stringify([...duplicates, ...scholNoDupes, ...campNoDupes]))
        localStorage.setItem('stage1', JSON.stringify(records.filter(fields => fields['Current Level'] > 0 && fields['Current Level'] < 7)))
        localStorage.setItem('stage2', JSON.stringify(progress.filter(fields => fields['Level Number'] === 7  && (fields['Status'] === 'In progress' || fields['Status'] === 'Pending (Needs S2 project)')).filter((v,i,a)=>a.findIndex(v2=>(v2['Student Record'][0] === v['Student Record'][0]))===i)))
        localStorage.setItem('stage3', JSON.stringify(progress.filter(fields => fields['Level Number'] === 8  && fields['Status'] === 'Completed').filter((v,i,a)=>a.findIndex(v2=>(v2['Student Record'][0] === v['Student Record'][0]))===i)))
        setInitialData(false)
    }

    useEffect(()=> {
        loadLocalStorage()
    },[])

	return (
		<div className="flex h-full min-h-screen flex-col">
		<header className="flex items-center justify-between bg-slate-800 p-4 text-white">
			<h1 className="text-3xl font-bold">
			<Link to=".">V School</Link>
			</h1>
			<p>{user.email}</p>
			<Form action="/logout" method="post">
			<button
				type="submit"
				className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
			>
				Logout
			</button>
			</Form>
            {initialData && <button
				onClick={loadLocalStorage}
				className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
			>
				Refresh Data
			</button>}
		</header>

		<main className="flex h-full bg-white">
			<div className="h-full w-40 border-r bg-gray-50">
			<Link to="education/overview" className="block p-4 text-xl text-blue-500">
				Education
			</Link>
			<Link to="outcomes/overview" className="block p-4 text-xl text-blue-500">
				Outcomes
			</Link>
			<Link to="growth/pipeline" className="block p-4 text-xl text-blue-500">
				Growth
			</Link>
			</div>

			<div className="flex-1 p-6">
			<Outlet />
			</div>
		</main>
		</div>
	);
}