import { Link, Outlet, useLocation } from "@remix-run/react";
import users from "public/users_noBorder.png"

export default function EducationPage() {
    const { pathname } = useLocation();
    let path = pathname.slice(pathname.indexOf('/',7) + 1)

    return (
      <main>
           <div className = "pipeline-container">

            <div className = "pipeline-header">
              <img src = {users} className = "education-header-logo" alt  = "stats logo" />
              <h3 className = "header-title">Education Department</h3>  
                        {/* <img src = {randomUser}className = "userImg" /> */}
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
                    Student Progress
            </Link>
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    );
}
