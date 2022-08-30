import { Link, Outlet, useLocation, useLoaderData } from "@remix-run/react";
import searchBar from "public/images/search.png"
import { getData } from "../../../models/airtable.server"


// export const loader = async ({ request }) => {
//     let localStorage
//     if (typeof localStorage === "undefined" || localStorage === null) {
//       var LocalStorage = require('node-localstorage').LocalStorage;
//       localStorage = new LocalStorage('./scratch');
//     }

// 	await getData({
// 		pageName: 'AllStudentRecords',
// 		pageBase: "appRCE5sPrn56fpvC",
// 		pageTable: "tblLI0BswFWDNUrq6",
// 		pageFormula: "AND(NOT({Simple Status} = 'Not RLM'), NOT({Admissions Status} = ''))",
// 		pageFields: ["Admissions Status", "Course Start Date", "Course Subject", "Current Level", "Last Interaction Date", "Simple Status", "Student Name", "Time to Start" ]
// 	})
// 	await getData({
// 		pageName: 'AllStudentProgress',
// 		pageBase: "appRCE5sPrn56fpvC",
// 		pageTable: "tblFhb879oExYkEzQ",
// 		pageFormula: "",
// 		pageFields: ['Actual End Date', 'Compensation Rate', 'Compensation Unit', 'Course Completed in Days', 'Course Subject', 'Created On','Days in Level', 'Level Number', 'Start Date', 'Status', 'Student Record', 'Type' ]
// 	})
// 	await getData({
// 		pageName: 'AllCampaignData',
// 		pageBase: "appRCE5sPrn56fpvC",
// 		pageTable: "tblLI0BswFWDNUrq6",
// 		pageFormula: "NOT({Admissions Status} = '')",
// 		pageFields: ["Admissions Status", "Campaign Medium", "Campaign Name", "Campaign Source", "Course Start Date", "Contact Name"]
// 	})
// 	await getData({
// 		pageName: 'AllScholarshipData',
// 		pageBase: "appDtw82NJafLsLdO",
// 		pageTable: "tblPXgXCQ2rj6d5e9",
// 		pageFormula: "",
// 		pageFields: ["Created", "Name", "Scholarship Name", "UTM Campaign", "UTM Content", "UTM Medium", "UTM Source"]
// 	})

// 	return {
//         campaign: JSON.parse(localStorage.getItem('AllCampaignData')),
//         scholarship: JSON.parse(localStorage.getItem('AllScholarshipData')),
//         records: JSON.parse(localStorage.getItem('AllStudentRecords')),
//         progress: JSON.parse(localStorage.getItem('AllStudentProgress'))
//     };
// };


export default function StudentProgressPage() {

    // let {campaign, records, scholarship, progress} = useLoaderData()


    const { pathname } = useLocation();
    let path = pathname.slice(pathname.indexOf('/',7) + 1)
    
    return (
        <main>

            <div className = "department-nav-links">
              <Link to = "development" className = "dept-link" id = {path.includes('development') ? "active-program-link" : "false"}>DEVELOPMENT</Link>
              <Link to = "design" className = "dept-link"  id = {path.includes('design') ? "active-program-link" : "false"}>DESIGN</Link>
              <Link to = "security" className = "dept-link"  id = {path.includes('security') ? "active-program-link" : "false"}>SECURITY</Link>
              <Link to = "blockchain" className = "dept-link"  id = {path.includes('blockchain') ? "active-program-link" : "false"}>BLOCKCHAIN</Link>
              <Link to = "all" className = "dept-link" id = {path.includes('all') ? "active-program-link" : "false"}>ALL</Link>
            </div>

        
        <div className="flex-1 p-6">
          <Outlet />
        </div>
        <div className = "progress-search-container">
            <p className = "channels-header" style = {{marginLeft: "75px"}}>Students</p>
                <div className = "channels-searchbar" style = {{marginLeft: "75px"}}>
                    <img src = {searchBar} className = "search-icon" alt = "searchbarLogo" />
                    <input type= 'text' placeholder="Find Student" />
                </div>
                <div className = "channels-filters" style = {{marginLeft: "75px"}}>
                    <select className = "filter-inputs">
                        <option>LEVEL</option>
                    </select>
                    <select className = "filter-inputs">
                        <option>STATUS</option>
                    </select>
                    <select className = "filter-inputs">
                        <option>SORT BY</option>
                    </select>
                        
                </div>
        </div>
        </main>
    );
}