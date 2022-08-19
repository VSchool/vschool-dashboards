import React, {useState} from "react"
import vsLogo from "public/vs_logo.svg"
import homeLogo from "public/home.png"
import clipboard from "public/clipboard.png"
import award from "public/award.png"
import globe from "public/globe.png"
import users from "public/users_noBorder.png"
import stats from "public/stats.png"
import {Link, Outlet, useLocation} from "@remix-run/react";

console.log("navbar-component")
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

    console.log(activeIcon)

    console.log(path)

    return (
        <>

        {/* do not need radio buttons.. links in remix do it for you */}
             <div className = "nav-container" >
                <img src = {vsLogo} className = "nav-vs-logo" alt = "vslogo"/>
                <Link to = "/home" className = "nav-link" id={path === "/home"  ? "active-nav-link" : "false"}>
                       <label for = "home-radio">
                        <input type ="radio" name = "navIcon" value = "home" id = "home-radio" className = "nav-inputs" checked = {activeIcon.navItem === "home"} onChange = {handleChange} />
                        <img className = "nav-item"src = {homeLogo} alt = "home-icon"/>
                    </label>  
                </Link>
                <Link to = "/" className = "nav-link" >
                    <label>
                        <input type = "radio" name = "navIcon" value = "clipboard" className = "nav-inputs" checked = {activeIcon === "clipboard"}  onChange = {handleChange} />
                        <img className = "nav-item" src = {clipboard} alt = "clipboard" />
                    </label>
                </Link>
                <Link to = "/" className = "nav-link">
                    <label>
                        <input type = "radio" name ="navIcon" value = "globe" className = "nav-inputs" checked = {activeIcon === "globe"}  onChange = {handleChange}/>
                        <img className = "nav-item"src = {globe} alt = "globe"/>
                    </label>
                </Link>
                <Link to = "/home/growth/pipeline" className = "nav-link" id={path.includes("/home/growth") ? "active-nav-link" : "false"}>
                       <label for = "stats-radio">
                        <input type ="radio" name = "navIcon" value = "stats" id = "stats-radio" className = "nav-inputs"  checked = {activeIcon.navItem === "stats" } onChange = {handleChange} />
                       <img className = "nav-item"src = {stats} alt = "stats" />
                    </label>   
                </Link>
                <Link to = "/home/education/overview" className = "nav-link" id={path.includes('education/overview') || pathname.includes('student-progress')  ? "active-nav-link" : "false"}>
                    <label>
                        <input type = "radio" name = "navIcon" value = "users" id ="users-radio" className="nav-inputs" checked = {activeIcon === "users" }  onChange = {handleChange}/>
                        <img className = "nav-item users" src = {users} alt = "users" />
                    </label>
                </Link>
                <Link to = "/home/outcomes/overview" className = "nav-link"  id={path.includes('outcomes/overview') || pathname.includes('outcomes/stage1') || pathname.includes('outcomes/stage2') || pathname.includes('outcomes/stage3') ? "active-nav-link" : "false"}>
                    <label>
                        <input type = "radio" name = "navIcon" value = "award" id = "award-radio" className = "nav-inputs" checked = {activeIcon === "award"}  onChange = {handleChange}/>
                        <img className = "nav-item"src = {award} alt = "award" />
                    </label>
                </Link> 
                 
            </div>
           
        </>
    )
} 