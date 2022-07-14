import { Link, Outlet } from "@remix-run/react";

export default function Stage2Links() {
    
    return (
      <main>
        <div className="flex">
            <Link className="block p-4 text-xl text-blue-500" to="all">All</Link>
            <Link className="block p-4 text-xl text-blue-500" to="development">Development</Link>
            <Link className="block p-4 text-xl text-blue-500" to="design">Design</Link>
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    );
}