import { Link, Outlet, useLocation } from "@remix-run/react";

export default function EducationPage() {
    const { pathname } = useLocation();
    let path = pathname.slice(pathname.indexOf('/',7) + 1)

    return (
      <main>
        <div className="flex">
            <Link 
                id={path.includes('overview')  ? "active-link" : "false"}
                className="link p-4 mx-2"
                to="overview">
                    Overview 
            </Link>
            <Link 
                id={path.includes('student-progress') ? "active-link" : "false"}
                className="link p-4 mx-2"
                to="student-progress" >
                    Student Progress
            </Link>
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    );
}
