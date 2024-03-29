import { useParams } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { useState, useContext } from 'react';


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

export default function CoursePage() {
    let {records, progress} = useLoaderData()

    const { course } = useParams()

    if(course !== "development" && course !== "design" && course !== "all"){
      return <a href="http://zschool.io/">you found the easter egg</a>
    }

    const recordCallback = {
      development: fields => "FSJS" ? fields["Course Subject"] === "FSJS" : fields,
      design: fields => "XD" ? fields["Course Subject"] === "XD" : fields,
      all: fields => "XD" || "FSJS" ? fields["Course Subject"] === "XD" || "FSJS" : fields
    }

    const pausedCallback = {
      development: fields => "FSJS" && "Paused" ? fields["Course Subject"] === "FSJS" && fields["Simple Status"] === "Paused" : fields,
      design: fields => "XD" && "Paused" ? fields["Course Subject"] === "XD" && fields["Simple Status"] === "Paused" : fields,
      all: fields => "Paused" ? fields["Simple Status"] === "Paused" : fields
    }
  
    const filteredRecords = records.filter(recordCallback[course])
    const pausedRecords = records.filter(pausedCallback[course])

      return (
          <main>
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
                                      <h3 className = "card-nums" > {pausedRecords.length} </h3>
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
          </main>
      );
}