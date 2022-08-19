import React from "react"
import stats from "public/stats.png"
// import randomUser from "public/randomUser.png"

export default function DepartmentPipeline(){
    return (
        <div className = "pipeline-container">

            <div className = "pipeline-header">
                <img src = {stats} className = "header-logo" alt  = "stats logo" />
                <h3 className = "header-title">Growth Department</h3>  
                {/* <img src = {randomUser}className = "userImg" /> */}
            </div>
            
        </div>
    )
}