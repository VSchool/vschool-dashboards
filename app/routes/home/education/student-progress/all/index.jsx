import { useLoaderData } from "@remix-run/react";
import DisplayData from "../../../../components/displayData";

export const loader = async () => {
    let localStorage
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');
    }

    return {
      records: JSON.parse(localStorage.getItem('AllStudentRecords')),
      progress: JSON.parse(localStorage.getItem('AllStudentProgress'))
    }
  };

export default function AllStudentProgressPage() {
    const { records, progress } = useLoaderData();
    
    return (
        <main>
			<DisplayData records={records} progress={progress} title={'All Student Progress Records'} dept={'education'} />
        </main>
    );
}