import { Link, Outlet } from "@remix-run/react";

export default function OutcomesPage() {
    
    return (
      <main>
        <div className="flex">
            <Link className="block p-4 text-xl text-blue-500" to="overview">Overview</Link>
            <Link className="block p-4 text-xl text-blue-500" to="stage1">Stage 1</Link>
            <Link className="block p-4 text-xl text-blue-500" to="stage2">Stage 2</Link>
            <Link className="block p-4 text-xl text-blue-500" to="stage3">Stage 3</Link>
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    );
}
