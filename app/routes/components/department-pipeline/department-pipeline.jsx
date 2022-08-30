import React from "react"
import stats from "public/images/stats.png"
import randomUser from "public/images/randomUser.png"

export default function DepartmentPipeline(){
    return (
        <div className = "department-container">

            <div className = "department-header">
                <img src = {stats} className = "header-logo" alt  = "stats logo" />
                <h3 className = "header-title">Growth Department</h3>  
            </div>
                <div className = "userImg" ></div>
        </div>
    )
}