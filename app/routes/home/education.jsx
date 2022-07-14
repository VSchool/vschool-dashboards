import { Link, Outlet } from "@remix-run/react";

export default function EducationPage() {
    
    return (
      <main>
        <div className="flex">
            <Link className="block p-4 text-xl text-blue-500" to="overview">Overview</Link>
            <Link className="block p-4 text-xl text-blue-500" to="student-progress">Student Progress</Link>
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    );
}