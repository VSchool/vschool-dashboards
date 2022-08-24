import { useLoaderData, Link} from "@remix-run/react";
import DisplayData from "../../../../components/displayData";
import {Context} from "../../../data-context"
import {useContext} from 'react';


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



export default function AllStage1Page() {
    // const { records, progress } = useLoaderData();

    const { progress, page, title, dept, course, setTimeFrame, filteredRecords, filteredStage1, filteredStage2, filteredStage3 } = useContext(Context);

  
 
    return (
        <main>      
             
             <div className = "small-card-container">
                                <div className = "small-card">
                                    <h3 className = "card-title education active">ACTIVE</h3>
                                    <h3 className = "card-nums" >{filteredRecords.filter(fields => fields["Simple Status"] === "In Progress").length}</h3>
                                    <p className = "card-compared-stat">+10%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>From last month</span></p>                       
                                </div>

                                <div className = "small-card">
                                    <h3 className = "card-title education paused">PAUSED</h3>
                                    <h3 className = "card-nums" >  </h3>
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
                        
        </main>
    );
}