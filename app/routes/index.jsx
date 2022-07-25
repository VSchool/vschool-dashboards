import { Link, useTransition } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  const transition = useTransition();

  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative">
            <div className="lg:pb-18 relative px-40 pt-16 pb-8 sm:px-40 sm:pt-24 sm:pb-14 lg:px-40 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-6xl">
                <span className="block uppercase text-blue-500 drop-shadow-md">
                  V School Dashboards
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {user ? (
                  <Link
                    to="/home"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
                    disabled={transition.state === 'loading'}
                  >
                    {transition.state === 'loading' ? 'Loading...' : `View Dashboards as ${user.email}`}
                  </Link>
                ) : (
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-md bg-blue-500 px-8 py-3 font-medium text-white hover:bg-blue-600  "
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div>
              <a href="https://remix.run">
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
