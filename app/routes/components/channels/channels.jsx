import React from "react"
import searchBar from "public/search.png"

export default function Channels(){
    return (
        <>
           <div className = "channels-container">
                <p className = "channels-header">Channels</p>
                <div className = "channels-searchbar">
                    <img src = {searchBar} className = "search-icon" />
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
                <p className = "results">7 Results</p>
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
        </>
    )
}