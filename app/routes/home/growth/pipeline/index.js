import DisplayData from '../../../components/displayData';
import { useContext, useEffect, useCallback } from 'react'
import {Context} from '../../data-context'
import Timeframe from '../../../components/timeframe';
import searchBar from "public/images/search.png"
export default function Pipeline (){
const { setInitialGrowth, growthRecords, setTimeFrame } = useContext(Context);

    // const getInitialGrowth = useCallback(setInitialGrowth, [])

    useEffect(()=>{
        setInitialGrowth("")
    }, [])

   
    return (
        <div>
        
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
        </div>
    )
}