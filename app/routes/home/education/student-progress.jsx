import { Link, Outlet } from "@remix-run/react";

export default function StudentProgressPage() {
    
    return (
        <main>
        <div className="flex">
            <Link to="all" className="block p-4 text-xl text-blue-500">All</Link>
            <Link to="development" className="block p-4 text-xl text-blue-500">Development</Link>
            <Link to="design" className="block p-4 text-xl text-blue-500">Design</Link>
        </div>
        
        <div className="flex-1 p-6">
          <Outlet />
        </div>
        </main>
    );
}