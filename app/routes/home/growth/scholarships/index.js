import DisplayData from "../../../components/displayData"
import searchBar from "public/images/search.png"
import {Context} from '../../data-context';
import { useContext } from 'react';
import Timeframe from "../../../components/timeframe";

import { useLoaderData } from "@remix-run/react";
import { getData } from "../../../../models/airtable.server";


export const loader = async ({ request }) => {
    let localStorage
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');
    }
    return {
        stage1Records: JSON.parse(localStorage.getItem('stage1')),
        stage2Records: JSON.parse(localStorage.getItem('stage2')),
        stage3Records: JSON.parse(localStorage.getItem("stage3")),
        allGrowthRecords:JSON.parse(localStorage.getItem('AllGrowthRecords'))
      }
    };

	



export default function GrowthScholarships(){

    let {allGrowthRecords, stage1Records} = useLoaderData()

    const { setTimeFrame } = useContext(Context);

    console.log(allGrowthRecords)
    

    return (
        
        <>
            <div>
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
                       
            </div>
        </>
    )
}