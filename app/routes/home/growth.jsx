import { Link, Outlet, useLocation } from "@remix-run/react";
import {useState} from "react"
import stats from "public/images/stats.png"


export default function EducationPage() {

// Need to move to DepartementHeader component
  const [isOpen, setIsOpen] = useState(false)

  function toggleProfileDropDown(){
    setIsOpen(!isOpen)
  }

  const { pathname } = useLocation();
  let path = pathname.slice(pathname.indexOf('/',7) + 1)
    
    return (
      <main>

         <div className = "department-container">

          <div className = "department-header">

            <img src = {stats} className = "header-logo" alt  = "stats logo" />
            <h3 className = "header-title">Growth Department</h3>  

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

          <div className="view-links">
            <Link className="growth-pages-link" to="pipeline" id={path.includes('pipeline')  ? "active-link" : "false"}>Pipeline</Link>
            <Link className="growth-pages-link" to="partners" id={path.includes('partners')  ? "active-link" : "false"}>Partners</Link>
            <Link className="growth-pages-link" to="scholarships" id={path.includes('scholarships')  ? "active-link" : "false"}>Scholarships</Link>
          </div>

          <div>
            <Outlet />
          </div> 

        </div>
        
      </main>
    );
}
