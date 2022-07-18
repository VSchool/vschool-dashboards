import { useLoaderData } from "@remix-run/react";
import { useEffect } from 'react';

export const loader = async () => {
    let localStorage
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');
    }
    
    return {
      campaign: JSON.parse(localStorage.getItem('AllCampaignData')),
      scholarship: JSON.parse(localStorage.getItem('AllScholarshipData'))
    }
  };

export default function GrowthIndex (){
    const { campaign, scholarship } = useLoaderData()
    
    function loadLocalStorage (){
      const duplicates = [];
      const campNoDupes = [];
      campaign.forEach((item) => {
        const found = scholarship.find(field => item['Contact Name'] && item['Contact Name'][0] == field['Name']);
        found ? duplicates.push({ ...item,...found }) : campNoDupes.push(item)
      })
      const scholNoDupes = scholarship.filter((item) => !duplicates.find(field => item['Name'] == field['Name']))
      localStorage.setItem('AllGrowthRecords', JSON.stringify([...duplicates, ...scholNoDupes, ...campNoDupes]))
    }

    useEffect(()=> {
        loadLocalStorage()
    },[])

    return (
        <div>
            <h1>Overview Growth</h1>
            <button onClick={loadLocalStorage}>Refresh</button>
        </div>
    )
}