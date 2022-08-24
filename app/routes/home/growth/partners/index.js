import DisplayData from '../../../components/displayData';
import { useContext } from 'react';
import {Context} from '../../data-context';
import searchBar from "public/search.png"
import Timeframe from '../../../components/timeframe';

export default function Partners (){
    const { records, progress, page, title, dept, course, setTimeFrame } = useContext(Context);
    
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