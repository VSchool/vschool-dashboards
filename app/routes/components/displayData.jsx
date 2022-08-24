import { useEffect, useState } from 'react';
import Timeframe from '../components/timeframe';
import Channels from './channels/channels';
import searchBar from "public/search.png"
import devLogo from "public/dev.png"
import designLogo from "public/design.png"
import securityLogo from 'public/security.png'
import blockchainLogo from "public/blockchain.png"

import { useContext } from 'react';
import {Context} from '../home/data-context';


export default function DisplayData ({records, progress, page, title, dept, course}) {
	
    const {  filteredRecords, 
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
        setInitialEducation } = useContext(Context);

    return (
        <>
            {/* <h1>{title}</h1> */}
            
            <br />
            <hr />
            <br />
            <div>
                {(dept === 'education' && page === "overview" || (dept === 'outcomes' && page === 'stage1')) && 
                    <>
                   
                       
                        {dept === 'outcomes' && <p>Started: {filteredStage1.filter(fields => fields["Simple Status"] === "In Progress").length}</p>}
                       

                        
              
                    </>
                }              
                

                {(dept === 'outcomes' && page === 'overview') &&
                    <>
                      

                            {/* <p>Stage 1: {filteredStage1.length}</p> */}
                            {/* <p>Stage 2: {filteredStage2.length}</p> */}
                            {/* <p>Stage 3: {filteredStage3.length}</p> */}
                            {/* <p>Enrollments: {filteredRecords.filter(fields => fields["Admissions Status"] === "Started").length}</p> */}
                            {/* <p>Stage 1 Completions: {filteredStage2.length}</p> */}
                            {/* <p>Hired: {filteredStage3.length}</p> */}

                      
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

                {page === 'overview' && 
                <>

                <div className = "student-overview-container">
                    <div className = "student-overview-card">
                        <img src = {devLogo} alt = "devLogo" className = "dept-logo"/>
                        <h3 className = "card-title" style = {{color: "#514F4B", fontWeight: "700"}}>Development</h3>
                        <h3 className = "card-nums" style = {{fontSize: "32px"}}> {filteredRecords.filter(fields => fields["Simple Status"] === "In Progress" && fields["Course Subject"] === "FSJS").length}</h3>
                        <p className = "card-compared-stat" >+7%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>Compared to last month</span></p>
                    </div>

                    <div className = "student-overview-card">
                        <img src = {designLogo} alt = "designLogo" className = "dept-logo"/>
                        <h3 className = "card-title" style = {{color: "#514F4B", fontWeight: "700"}}>Design</h3>
                        <h3 className = "card-nums" style = {{fontSize: "32px"}}>  {filteredRecords.filter(fields => fields["Simple Status"] === "In Progress" && fields["Course Subject"] === "XD").length}</h3>
                        <p className = "card-compared-stat" >+2%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>Compared to last month</span></p>
                    </div>

                    <div className = "student-overview-card">
                        <img src = {securityLogo} alt = "securityLogo" className = "dept-logo"/>
                        <h3 className = "card-title" style = {{color: "#514F4B", fontWeight: "700"}}>Design</h3>
                        <h3 className = "card-nums" style = {{fontSize: "32px"}}>  {filteredRecords.filter(fields => fields["Simple Status"] === "In Progress" && fields["Course Subject"] === "Security").length}</h3>
                       <span style = {{color: "black", marginLeft: "14px", fontFamily: "aktiv-grotesk,sans-serif"}}>Coming Soon</span>
                    </div>


                    <div className = "student-overview-card">
                        <img src = {blockchainLogo} alt = "blockchainLogo" className = "dept-logo"/>
                        <h3 className = "card-title" style = {{color: "#514F4B", fontWeight: "700"}}>Design</h3>
                        <h3 className = "card-nums" style = {{fontSize: "32px"}}> {filteredRecords.filter(fields => fields["Simple Status"] === "In Progress" && fields["Course Subject"] === "Blockchain").length}</h3>
                       <span style = {{color: "black", marginLeft: "14px", fontFamily: "aktiv-grotesk,sans-serif"}}>Coming Soon</span>
                    </div>



                </div>

{/* 
                    <p>Development: {filteredRecords.filter(fields => fields["Simple Status"] === "In Progress" && fields["Course Subject"] === "FSJS").length}</p>
                    <p>Design:</p>
                    <p>Security: {filteredRecords.filter(fields => fields["Simple Status"] === "In Progress" && fields["Course Subject"] === "Security").length}</p>
                    <p>Blockchain: {filteredRecords.filter(fields => fields["Simple Status"] === "In Progress" && fields["Course Subject"] === "Blockchain").length}</p> */}
                </>
                }

            </div>
        </>
    )
}
   
                