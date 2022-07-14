import { json } from "@remix-run/node";
import { Form, Link, Outlet } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { getData } from "../models/airtable.server";
import { useUser } from "~/utils";

export const loader = async ({ request }) => {
  const userId = await requireUserId(request);
  await getData({
    pageName: 'AllStudentRecords',
    pageBase: "appRCE5sPrn56fpvC",
    pageTable: "tblLI0BswFWDNUrq6",
    pageFormula: "AND(NOT({Simple Status} = 'Not RLM'), NOT({Admissions Status} = ''))",
    pageFields: ["Admissions Status", "Course Start Date", "Course Subject", "Current Level", "Last Interaction Date", "Simple Status", "Student Name", "Time to Start" ]
  })
  await getData({
    pageName: 'AllStudentProgress',
    pageBase: "appRCE5sPrn56fpvC",
    pageTable: "tblFhb879oExYkEzQ",
    pageFormula: "",
    pageFields: ['Actual End Date', 'Compensation Rate', 'Compensation Unit', 'Course Completed in Days', 'Course Subject', 'Created On','Days in Level', 'Level Number', 'Start Date', 'Status', 'Student Record', 'Type' ]
  })
  await getData({
    pageName: 'AllCampaignData',
    pageBase: "appRCE5sPrn56fpvC",
    pageTable: "tblLI0BswFWDNUrq6",
    pageFormula: "NOT({Admissions Status} = '')",
    pageFields: ["Admissions Status", "Campaign Medium", "Campaign Name", "Campaign Source", "Course Start Date", "Contact Name"]
  })
  await getData({
    pageName: 'AllScholarshipData',
    pageBase: "appDtw82NJafLsLdO",
    pageTable: "tblPXgXCQ2rj6d5e9",
    pageFormula: "",
    pageFields: ["Created", "Name", "Scholarship Name", "UTM Campaign", "UTM Content", "UTM Medium", "UTM Source"]
  })
  return json({});
};

export default function HomePage() {
  const user = useUser();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">V School</Link>
        </h1>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="flex h-full bg-white">
        <div className="h-full w-40 border-r bg-gray-50">
          <Link to="education" className="block p-4 text-xl text-blue-500">
            Education
          </Link>
          <Link to="outcomes" className="block p-4 text-xl text-blue-500">
            Outcomes
          </Link>
          <Link to="growth" className="block p-4 text-xl text-blue-500">
            Growth
          </Link>
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}