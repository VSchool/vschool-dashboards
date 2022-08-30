import React, {useState} from "react"
import vsLogo from "public/images/vs_logo.svg"
import homeLogo from "public/images/home.png"
import clipboard from "public/images/clipboard.png"
import award from "public/images/award.png"
import globe from "public/images/globe.png"
import users from "public/images/users_noBorder.png"
import stats from "public/images/stats.png"
import {Link, Outlet, useLocation} from "@remix-run/react";


export default function NavBar() {

    const { pathname } = useLocation();
    let path = pathname.slice(pathname.indexOf('/',16) + 1)

    const [activeIcon, setActiveIcon] = useState({
        navItem: ""
    })
    

    function handleChange(e) {
        const {name, value} = e.target
        console.log('handlechange is firing')
         setActiveIcon({[name]: value})
    }





    return (
        <>

        {/* do not need radio buttons.. links in remix do it for you */}
             
                <img src = {vsLogo} className = "nav-vs-logo" alt = "vslogo"/>
                <div className = "nav-container" >
                <Link to = "/home" className = "nav-link" id={path === "/home"  ? "active-nav-link" : "false"}>
                       
                       <img className = "nav-item"src = {homeLogo} alt = "home-icon"/>
                
                </Link>
                <Link to = "/" className = "nav-link" >
                                           
                        <img className = "nav-item" src = {clipboard} alt = "clipboard" />
                    
                </Link>
                <Link to = "/" className = "nav-link">
                    
                        <img className = "nav-item"src = {globe} alt = "globe"/>
                    
                </Link>
                <Link to = "/home/growth/pipeline" className = "nav-link" id={path.includes("/home/growth") ? "active-nav-link" : "false"}>
                       <img className = "nav-item"src = {stats} alt = "stats" />
                       
                </Link>
                <Link to = "/home/education/overview" className = "nav-link" id={path.includes('education/overview') || pathname.includes('student-progress')  ? "active-nav-link" : "false"}>
                    
                        <img className = "nav-item users" src = {users} alt = "users" />
                    
                </Link>
                <Link to = "/home/outcomes/overview" className = "nav-link"  id={path.includes('outcomes/overview') || pathname.includes('outcomes/stage1') || pathname.includes('outcomes/stage2') || pathname.includes('outcomes/stage3') ? "active-nav-link" : "false"}>
                    
                        <img className = "nav-item"src = {award} alt = "award" />
                    
                </Link> 
                 
            </div>
           
        </>
    )
} 