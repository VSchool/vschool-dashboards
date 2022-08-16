import { Link, Outlet } from "@remix-run/react";
import React from "react"
import DepartmentHeader from "../components/department-pipeline/department-pipeline";

export default function EducationPage() {
    
    return (
      <main>
         <DepartmentHeader />
        <div className="flex view-links">
            <Link className="block p-4 text-m text-blue-500" to="pipeline">Pipeline</Link>
            <Link className="block p-4 text-m text-blue-500" to="partners">Partners</Link>
            <Link className="block p-4 text-m text-blue-500" to="scholarships">Scholarships</Link>
        </div>
        
        <div>
          <Outlet />
        </div> 
      </main>
    );
}
