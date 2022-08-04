import { useLoaderData } from "@remix-run/react";
import React, { useState } from "react";
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

export default function EducationIndex() {
	const { records } = useLoaderData();
	const [ filteredRecords, setFilteredRecords ] = useState(records);
    const [ paused, setPaused ] = useState(records.filter(fields => fields["Simple Status"] === "Paused"))

	function setTimeFrame (timeframe){
        timeframe === 'all' ? setFilteredRecords(records) :
        setFilteredRecords(records.filter(fields => {
            var d = new Date(fields["Course Start Date"]);
            var f = new Date();
            f.toLocaleDateString();
            timeframe === 'week' ? f.setDate(f.getDate() - 7) : f.setMonth(f.getMonth() - timeframe);
            return d > f
        }))
        timeframe === 'all' ? setPaused(records.filter(fields => fields["Simple Status"] === "Paused")) :
        setPaused(records.filter(fields => fields["Simple Status"] === "Paused" && (timeframe === 'week' ? fields['Time to Start'] < 7 : fields['Time to Start'] < (timeframe * 30))))
    }
    
    return (
        <main>
              <h1>Overview Records</h1>
              <SetTimeFrame setTimeFrame={setTimeFrame} />
              <br />
              <hr />
              <br />
              <div>
                  <p>Total Student Records: {filteredRecords.length}</p>
                  <p>Completed: {filteredRecords.filter(fields => fields["Simple Status"] === "Completed - Level 8" || fields["Simple Status"] === "Jobbed Out").length}</p>
                  <p>Active: {filteredRecords.filter(fields => fields["Simple Status"] === "In Progress").length}</p>
                  <p>Paused: {paused.length}</p>
                  <p>Meaningful Progress: {filteredRecords.filter(fields => {
                      var d = new Date(fields["Last Interaction Date"]);
                      var f = new Date();
                      f.toLocaleDateString();
                      f.setMonth(f.getMonth() - 3);
                      return fields["Simple Status"] === "In Progress" && d > f
                    }).length}</p>
                  <p>Dropped: {filteredRecords.filter(fields => fields["Simple Status"] === "Withdrew").length}</p>
                  <br />
                  <hr />
                  <br />
                  <p>Development: {filteredRecords.filter(fields => fields["Simple Status"] === "In Progress" && fields["Course Subject"] === "FSJS").length}</p>
                  <p>Design: {filteredRecords.filter(fields => fields["Simple Status"] === "In Progress" && fields["Course Subject"] === "XD").length}</p>
                  <p>Security: {filteredRecords.filter(fields => fields["Simple Status"] === "In Progress" && fields["Course Subject"] === "Security").length}</p>
                  <p>Blockchain: {filteredRecords.filter(fields => fields["Simple Status"] === "In Progress" && fields["Course Subject"] === "Blockchain").length}</p>
              </div>
        </main>
    );
}