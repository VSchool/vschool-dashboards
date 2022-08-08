import { useLoaderData } from "@remix-run/react";
import DisplayData from "../../../components/displayData";

export const loader = async () => {
    let localStorage
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');
    }

    return {
      records: JSON.parse(localStorage.getItem('AllStudentRecords'))
    }
  };

export default function EducationIndex() {
	const { records } = useLoaderData();
    
    return (
        <main>
              <DisplayData page={'overview'} records={records} title={'Overview Records'} dept={'education'} />
        </main>
    );
}