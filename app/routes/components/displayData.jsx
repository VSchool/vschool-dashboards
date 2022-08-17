import { useEffect, useState } from 'react';
import Timeframe from '../components/timeframe';
import Channels from './channels/channels';

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
            <Timeframe timeframe={setInitialGrowth} />
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
                            <Channels />
                        </div>
                        {/* <p>Applications: {growthRecords.length}</p>
                        <p>Enrollments: {growthRecords.filter(fields => fields["Admissions Status"] === "Started").length}</p>
                        <p>Conversion Rate: {((growthRecords.filter(fields => fields["Admissions Status"] === "Started").length / growthRecords.length) * 100).toFixed(2)}%</p> */}
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
   
                