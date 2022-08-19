import { useLoaderData } from "@remix-run/react";
import DisplayData from "../../../components/displayData";
import Timeframe from "../../../components/timeframe";

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

export default function OutcomesIndex (){
    const { records } = useLoaderData()

    console.log(records)

    return (
        <div>
           <Timeframe />
            <DisplayData records={records} title={'Outcomes Overview'} dept={"outcomes"} page={"overview"} />
        </div>
    )
}