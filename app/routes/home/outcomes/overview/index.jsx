import { useLoaderData } from "@remix-run/react";
import DisplayData from "../../../components/displayData";
import Timeframe from "../../../components/timeframe";
import {Context} from "../../data-context"
import { useContext } from 'react';

export const loader = async () => {
	let localStorage
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');
    }

    return {
      stage1Records: JSON.parse(localStorage.getItem('stage1')),
      stage2Records: JSON.parse(localStorage.getItem('stage2')),
      stage3Records: JSON.parse(localStorage.getItem("stage3"))
    }
  };

export default function OutcomesIndex (){
  const { progress, page, title, dept, course, setTimeFrame, filteredRecords, filteredStage1, filteredStage2, filteredStage3 } = useContext(Context);
   let { stage1Records, stage2Records, stage3Records } = useLoaderData()

    // console.log(filteredStage1)
const filteredStage1Records = stage1Records.filter(fields => fields["Admissions Status"] === "Started")


    return (
        <div>
           <Timeframe />
           <div className = "outcomes-overview-stats">
                            <div className = "card-wrapper">
                                <h3 className = "card-title">Stage 1</h3>
                                <h3 className = "card-nums">{stage1Records.length}</h3>
                                <p className = "card-compared-stat">+5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>Compared to last month</span></p>
                            </div>
                            <div className = "card-wrapper">
                                <h3 className = "card-title">Stage 2</h3>
                                <h3 className = "card-nums">{stage2Records.length}</h3>
                                <p className = "card-compared-stat">+5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>Compared to last month</span></p>
                            </div>
                            <div className = "card-wrapper">
                                <h3 className = "card-title">Stage 3</h3>
                                <h3 className = "card-nums">{stage3Records.length}</h3>
                                <p className = "card-compared-stat">+5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>Compared to last month</span></p>
                            </div>
                            <div className = "card-wrapper">
                                <h3 className = "card-title">Enrollments</h3>
                                <h3 className = "card-nums">{filteredStage1Records.length}</h3>
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

        </div>
        </div>
    )
}