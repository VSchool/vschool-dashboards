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
                    <div className = "overview-cards-container">
                        <div className = "overview-cards-wrapper">
                            <div className = "overview-card-large">
                                <h3 className = "card-title">Total Students</h3>
                                <h3 className = "card-nums" style = {{fontSize: "80px", marginBottom: "15px"}}>{filteredRecords.length}</h3>
                                 <p className = "card-compared-stat">+5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>Compared to last month</span></p>
                            </div>
                                     
                            <div className = "overview-card-large">
                                <h3 className = "card-title education completed">COMPLETED</h3>
                                <h3 className = "card-nums" style = {{fontSize: "44px"}}>{filteredRecords.filter(fields => fields["Simple Status"] === "Completed - Level 8" || fields["Simple Status"] === "Jobbed Out").length}</h3>
                                <p className = "card-compared-stat">+10%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>From last month</span></p>
                            </div>

                    
{/* 
                            <div className = "small-card">
                                    <h3 className = "card-title">Median Completion</h3>
                                    <h3 className = "card-nums" > {getMedian(medianComp, 'Course Completed in Days') ? getMedian(medianComp, 'Course Completed in Days') + ' days': 'Not Enough Data'}</h3>
                                    <p className = "card-compared-stat">+0 from goal <span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>Last 100 completions</span></p>                       
                                </div> */}

                        </div>  

                    

                        <div className = "small-card-container">
                                <div className = "small-card">
                                    <h3 className = "card-title education active">ACTIVE</h3>
                                    <h3 className = "card-nums" >{filteredRecords.filter(fields => fields["Simple Status"] === "In Progress").length}</h3>
                                    <p className = "card-compared-stat">+10%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>From last month</span></p>                       
                                </div>

                                <div className = "small-card">
                                    <h3 className = "card-title education paused">PAUSED</h3>
                                    <h3 className = "card-nums" > {paused.length} </h3>
                                    <p className = "card-compared-stat" style = {{color: "red"}}>-5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>From last month</span></p>                       
                                </div>

                                <div className = "small-card">
                                    <h3 className = "card-title education mp">MP PROCESS</h3>
                                    <h3 className = "card-nums" > {filteredRecords.filter(fields => {
                                            var d = new Date(fields["Last Interaction Date"]);
                                            var f = new Date();
                                            f.toLocaleDateString();
                                            f.setMonth(f.getMonth() - 3);
                                            return fields["Simple Status"] === "In Progress" && d > f
                                        }).length}
                                    </h3>
                                    <p className = "card-compared-stat">+2%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>From last month</span></p>                       
                                </div>

                                <div className = "small-card">
                                    <h3 className = "card-title education dropped">DROPPED</h3>
                                    <h3 className = "card-nums" > {filteredRecords.filter(fields => fields["Simple Status"] === "Withdrew").length} </h3>
                                    <p className = "card-compared-stat">+10%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>From last month</span></p>                       
                                </div>

                        </div>
                        </div>

                        
                       
                        {dept === 'outcomes' && <p>Started: {filteredStage1.filter(fields => fields["Simple Status"] === "In Progress").length}</p>}
                       
    
                        {progress && <>
                            <p>Median Completion: {getMedian(medianComp, 'Course Completed in Days') ? getMedian(medianComp, 'Course Completed in Days') + ' Days': 'Not Enough Data'}</p>
                            <p>Median Days per Level: {getMedian(medianDays, 'Days in Level') ? getMedian(medianDays, 'Days in Level') + ' Days' : 'Not Enough Data'}</p>
                        </>}
                        
              
                    </>
                }

                {(dept === 'growth' && title === 'Pipeline')  &&
                    <>
                    <Timeframe timeframe={setTimeFrame} />
                        <div className = "card-container">
                            <div className = "card-wrapper">
                                <h3 className = "card-title">Total Applications </h3>
                                <h3 className = "card-nums">{growthRecords.length}</h3>
                                <p className = "card-compared-stat">+ 5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>Compared to last month</span></p>
                            </div>
                            <div className = "card-wrapper">
                                <h3 className = "card-title">Total Enrollments </h3>
                                <h3 className = "card-nums">{growthRecords.filter(fields => fields["Admissions Status"] === "Started").length}</h3>
                                <p className = "card-compared-stat">+5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>Compared to last month</span></p>
                            </div>
                            <div className = "card-wrapper">
                                <h3 className = "card-title">Conversion Rate</h3>
                                <h3 className = "card-nums"> {((growthRecords.filter(fields => fields["Admissions Status"] === "Started").length / growthRecords.length) * 100).toFixed(2)}%</h3>
                                <p className = "card-compared-stat">+5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>Compared to last month</span></p>
                            </div>
                            <div className = "channels-container">
                <p className = "channels-header">Channels</p>
                <div className = "channels-searchbar">
                    <img src = {searchBar} className = "search-icon" alt = "searchbarLogo" />
                    <input type= 'text' placeholder="Find Channel" />
                </div>
                <div className = "channels-filters">
                    <select className = "filter-inputs">
                        <option>DEPARTMENT</option>
                    </select>
                    <select className = "filter-inputs">
                        <option>CHANNEL</option>
                    </select>
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
                        {/* <p>Applications: {growthRecords.length}</p>
                        <p>Enrollments: {growthRecords.filter(fields => fields["Admissions Status"] === "Started").length}</p>
                        <p>Conversion Rate: {((growthRecords.filter(fields => fields["Admissions Status"] === "Started").length / growthRecords.length) * 100).toFixed(2)}%</p> */}
                    </>
                }
                {(dept === 'growth' && title === 'Partners') &&
                    <>
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
                       
                    </>
                
                }
                {(dept === 'growth' && title === 'Scholarships') && 
                
                <>

                <Timeframe timeframe={setTimeFrame} />
                <div className = "card-container">
                            <div className = "card-wrapper">
                                <h3 className = "card-title">Total Applications </h3>
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
                    <input type= 'text' placeholder="Find Scholarship" />
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
                       
                </>
                
                }

                {(dept === 'outcomes' && page === 'overview') &&
                    <>
                       <div className = "outcomes-overview-stats">
                            <div className = "card-wrapper">
                                <h3 className = "card-title">Stage 1</h3>
                                <h3 className = "card-nums">{filteredStage1.length}</h3>
                                <p className = "card-compared-stat">+5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>Compared to last month</span></p>
                            </div>
                            <div className = "card-wrapper">
                                <h3 className = "card-title">Stage 2</h3>
                                <h3 className = "card-nums">{filteredStage2.length}</h3>
                                <p className = "card-compared-stat">+5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>Compared to last month</span></p>
                            </div>
                            <div className = "card-wrapper">
                                <h3 className = "card-title">Stage 3</h3>
                                <h3 className = "card-nums">{filteredStage3.length}</h3>
                                <p className = "card-compared-stat">+5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>Compared to last month</span></p>
                            </div>
                            <div className = "card-wrapper">
                                <h3 className = "card-title">Enrollments</h3>
                                <h3 className = "card-nums">{filteredRecords.filter(fields => fields["Admissions Status"] === "Started").length}</h3>
                                <p className = "card-compared-stat">+5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>Compared to last month</span></p>
                            </div>
                            <div className = "card-wrapper">
                                <h3 className = "card-title">Stage 1 Completions</h3>
                                <h3 className = "card-nums"> {filteredStage2.length}</h3>
                                <p className = "card-compared-stat">+5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>Compared to last month</span></p>
                            </div>
                            <div className = "card-wrapper">
                                <h3 className = "card-title">Hired</h3>
                                <h3 className = "card-nums"> {filteredStage3.length}</h3>
                                <p className = "card-compared-stat">+5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>Compared to last month</span></p>
                            </div>


                            {/* <p>Stage 1: {filteredStage1.length}</p> */}
                            {/* <p>Stage 2: {filteredStage2.length}</p> */}
                            {/* <p>Stage 3: {filteredStage3.length}</p> */}
                            {/* <p>Enrollments: {filteredRecords.filter(fields => fields["Admissions Status"] === "Started").length}</p> */}
                            {/* <p>Stage 1 Completions: {filteredStage2.length}</p> */}
                            {/* <p>Hired: {filteredStage3.length}</p> */}

                      
                        </div>
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
   
                