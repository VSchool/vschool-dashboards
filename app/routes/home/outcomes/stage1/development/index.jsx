import { useLoaderData } from "@remix-run/react";
import DisplayData from "../../../../components/displayData";

export const loader = async () => {
    let localStorage;
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');
    }

    return {
      records: JSON.parse(localStorage.getItem('AllStudentRecords')),
      progress: JSON.parse(localStorage.getItem('AllStudentProgress'))
    }
  };

export default function AllStage1Page() {
    const { records, progress } = useLoaderData();
	
    return (
        <main>
            <DisplayData records={records} progress={progress} title={'All Stage 1 Development Records'} dept={"outcomes"} page={'stage1'} course={'FSJS'} />
        </main>
    );
}