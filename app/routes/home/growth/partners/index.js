import DisplayData from '../../../components/displayData';
import { useContext } from 'react';
import {Context} from '../../data-context';
import searchBar from "public/images/search.png"
import Timeframe from '../../../components/timeframe';
import { useLoaderData } from "@remix-run/react";
import { getData } from "../../../../models/airtable.server";


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
}



export default function Partners (){
    const {  setTimeFrame } = useContext(Context);

    const {scholarship} = useLoaderData()


    
    return (
        <div>
            <Timeframe timeframe={setTimeFrame} />
                    <div className = "card-container">
                        <div className = "card-wrapper">
                                <h3 className = "card-title">Total Partners </h3>
                                <h3 className = "card-nums">NaN</h3>
                                <p className = "card-compared-stat">+ 5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>Compared to last month</span></p>
                            </div>
                            <div className = "card-wrapper">
                                <h3 className = "card-title">Applications </h3>
                                <h3 className = "card-nums">NaN</h3>
                                <p className = "card-compared-stat">+ 5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>Compared to last month</span></p>
                            </div>
                            <div className = "card-wrapper">
                                <h3 className = "card-title">Enrollments </h3>
                                <h3 className = "card-nums">NaN</h3>
                                <p className = "card-compared-stat">+5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>Compared to last month</span></p>
                            </div>
                            <div className = "card-wrapper">
                                <h3 className = "card-title">Conversion</h3>
                                <h3 className = "card-nums">NaN</h3>
                                <p className = "card-compared-stat">+5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>Compared to last month</span></p>
                            </div>
                            <div className = "channels-container">
                <p className = "channels-header">Channels</p>
                <div className = "channels-searchbar">
                    <img src = {searchBar} className = "search-icon" alt = "searchbarLogo" />
                    <input type= 'text' placeholder="Find Partner" />
                </div>
                <div className = "channels-filters">
                    <select className = "filter-inputs">
                        <option>SORT BY</option>
                    </select>
                        
                </div>
                {/* table to list the channels */}

                <form>
                    <table>
                        <thead>
                            <tr>
                                <th>Channel</th>
                                <th>Department</th>
                                <th>Applications</th>
                                <th>Enrollments</th>
                                <th>Conversion</th>
                                <th>Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </form>

            </div>
                        </div>
                       
        </div>
    )
}