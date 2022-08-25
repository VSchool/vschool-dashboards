import { Link, Outlet, useLocation, useParams } from "@remix-run/react";
import award from "public/award.png"
import Timeframe from "../components/timeframe";
import searchBar from "public/search.png"

export default function OutcomesPage() {

  const { pathname } = useLocation();
  const params = useParams()
  console.log("pathname: ")
  console.log(pathname)
  let path = pathname.slice(pathname.indexOf('/',12) + 1)
  console.log(path)
    
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
        <div className = "progress-search-container">
          <p className = "channels-header" style = {{marginLeft: "75px"}}>Students</p>
          <div className = "channels-searchbar" style = {{marginLeft: "75px"}}>
            <img src = {searchBar} className = "search-icon" alt = "searchbarLogo" />
            <input type= 'text' placeholder="Find Student" />
          </div>
          <div className = "channels-filters" style = {{marginLeft: "75px"}}>
            <select className = "filter-inputs">
                <option>LEVEL</option>
            </select>
            <select className = "filter-inputs">
                <option>STATUS</option>
            </select>
            <select className = "filter-inputs">
                <option>SORT BY</option>
            </select>
          </div>
        </div>
      </main>
    );
}
