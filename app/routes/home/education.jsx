import { Link, Outlet, useLocation } from "@remix-run/react";
import users from "public/images/users_noBorder.png"
import {Context} from "./data-context"
import {useContext} from "react"

export default function EducationPage() {

  const {toggleProfileDropDown, isOpen} = useContext(Context)

    const { pathname } = useLocation();
    let path = pathname.slice(pathname.indexOf('/',7) + 1)

    return (
      <main>
        <div className = "department-container">

<div className = "department-header">

  <img src = {users} className = "header-logo users" alt  = "stats logo" />
  <h3 className = "header-title">Education Department</h3>  

</div>

<div onClick = {toggleProfileDropDown} className = "userImg" style = {{ backgroundImage: "url('https://scontent-dfw5-2.xx.fbcdn.net/v/t39.30808-1/295599508_10106293523695067_1591561887690737208_n.jpg?stp=dst-jpg_p160x160&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=oc6wsZ0Wk4cAX-GFXcf&tn=h0dLIWd2vOCDA4PB&_nc_ht=scontent-dfw5-2.xx&oh=00_AT_27X12aGoBMEyhPpWvL_YRFYABMtPxQYutuq28FU5VeA&oe=630DDD53')" }} ></div>

<div id = "profile-dropdown" className = {isOpen ? "" : "profile-closed"}>
  <div id = "profile-rectangle"></div>
  <p id = "welcome-msg">Hi Zak!</p>
  <div className = "dropdown-options">
    <p>Edit Profile</p>
    <p>Give Feedback</p>
    <p style = {{color: "red"}}>Logout</p>
  </div>
  
</div>
            
        

         


        <div className="flex education-links">

            <Link 
                id={path.includes('overview')  ? "active-link" : "false"}
                className="link p-4 mx-2"
                to="overview">
                    Overview 
            </Link>

            <Link 
                id={path.includes('student-progress') ? "active-link" : "false"}
                className="link p-4 mx-2"
                to="student-progress/all" >
                    Progress
            </Link>

            <Link 
                id={path.includes('team') ? "active-link" : "false"}
                className="link p-4 mx-2"
                to="team" >
                    Team
            </Link>

        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>

      </div>

    
      </main>
    );
}
