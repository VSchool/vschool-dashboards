import { Link, Outlet, useLocation } from "@remix-run/react";
import React from "react"
import DepartmentHeader from "../components/department-pipeline/department-pipeline";

export default function EducationPage() {

  const { pathname } = useLocation();
  let path = pathname.slice(pathname.indexOf('/',7) + 1)
    
    return (
      <main>
         <DepartmentHeader />
        <div className="flex view-links">
            <Link className="growth-pages-link" to="pipeline" id={path.includes('pipeline')  ? "active-link" : "false"}>Pipeline</Link>
            <Link className="growth-pages-link" to="partners" id={path.includes('partners')  ? "active-link" : "false"}>Partners</Link>
            <Link className="growth-pages-link" to="scholarships" id={path.includes('scholarships')  ? "active-link" : "false"}>Scholarships</Link>
        </div>
        
        <div>
          <Outlet />
        </div> 
      </main>
    );
}
