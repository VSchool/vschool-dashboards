import { useLoaderData } from "@remix-run/react";
import DisplayData from "../../../components/displayData";
import {Context} from '../../data-context';
import {useContext} from 'react'

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

  export default function TeamIndex(){
    return (
        <>
            This is the Team Component
        </>
    )
  }