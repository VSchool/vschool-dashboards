import { Link, Outlet, useLocation } from "@remix-run/react";
import award from "public/award.png"
import Timeframe from "../components/timeframe";

export default function OutcomesPage() {

  const { pathname } = useLocation();
  let path = pathname.slice(pathname.indexOf('/',12) + 1)
    
    return (
      <main>
        {/* THIS WILL BE A COMPONENT */}
        <div className = "pipeline-container">

        <div className = "pipeline-header">
            <img src = {award} className = "header-logo" alt  = "award logo" />
            <h3 className = "header-title">Outcomes Department</h3>  
            {/* <img src = {randomUser}className = "userImg" /> */}
        </div>

        </div>

        <div className="flex" style = {{marginLeft: "100px"}}>
            <Link className="block p-4 text-xl outcomes-link" to="overview" id={path.includes('overview')  ? "active-link" : "false"}>Overview</Link>
            <Link className="block p-4 text-xl outcomes-link" to="stage1/all" id={path.includes('stage1')  ? "active-link" : "false"}>Stage 1</Link>
            <Link className="block p-4 text-xl outcomes-link" to="stage2" id={path.includes('stage2')  ? "active-link" : "false"}>Stage 2</Link>
            <Link className="block p-4 text-xl outcomes-link" to="stage3" id={path.includes('stage3')  ? "active-link" : "false"}>Stage 3</Link>
        </div>

       

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    );
}
