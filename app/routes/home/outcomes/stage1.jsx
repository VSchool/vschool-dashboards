import { Link, Outlet, useLocation } from "@remix-run/react";


export default function Stage1Links() {

  const { pathname } = useLocation();
  let path = pathname.slice(pathname.indexOf('/',7) + 1)
    
    return (
      <main>
          <div className = "department-nav-links">
              <Link to = "development" className = "dept-link" id = {path.includes('development') ? "active-program-link" : "false"}>DEVELOPMENT</Link>
              <Link to = "design" className = "dept-link"  id = {path.includes('design') ? "active-program-link" : "false"}>DESIGN</Link>
              <Link to = "security" className = "dept-link"  id = {path.includes('security') ? "active-program-link" : "false"}>SECURITY</Link>
              <Link to = "blockchain" className = "dept-link"  id = {path.includes('blockchain') ? "active-program-link" : "false"}>BLOCKCHAIN</Link>
              <Link to = "all" className = "dept-link" id = {path.includes('all') ? "active-program-link" : "false"}>ALL</Link>
          </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
        {/* <div className = "progress-search-container">
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
                </div> */}
      </main>
    );
}