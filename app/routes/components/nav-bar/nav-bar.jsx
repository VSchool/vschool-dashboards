import React from "react"
import vsLogo from "public/vs_logo.svg"
import homeLogo from "public/home.png"
import clipboard from "public/clipboard.png"
import award from "public/award.png"
import globe from "public/globe.png"
import users from "public/users.png"
import stats from "public/stats.png"
import {Link, Outlet} from "@remix-run/react";

console.log("navbar-component")
export default function NavBar() {
    

    return (
        <>
            <div className = "nav-container">
                <img src = {vsLogo} className = "nav-vs-logo"/>
                <img className = "nav-item"src = {homeLogo} />
                <img className = "nav-item" src = {clipboard} />
                <img className = "nav-item"src = {globe} />
                <Link to = "./growth/pipeline"><img className = "nav-item"src = {stats} /></Link>
                <img className = "nav-item"src = {users} />
                <img className = "nav-item"src = {award} />
            </div>
           
        </>
    )
} 