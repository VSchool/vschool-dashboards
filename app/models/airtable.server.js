import axios from 'axios';
import Airtable from 'airtable';
import 'dotenv/config'


export async function getData({pageName, pageBase, pageTable, pageFormula, pageFields}, retrieve) {
    axios.defaults.headers['Authorization'] = `Bearer ${process.env.AIRTABLE_API_KEY}`;
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    if(localStorage.getItem(pageName) == undefined || retrieve){
        var base = Airtable.base(pageBase);
        var table = base.table(pageTable);
        const data = await table.select({ filterByFormula: pageFormula, fields: pageFields}).all()
        const fieldData = data.map(({fields}) => fields)
        try {
            localStorage.removeItem(pageName)
            localStorage.setItem(pageName, JSON.stringify(fieldData));
        } catch (e) {
            console.log(e, `Quota exceeded on ${pageName}!`);
        }
    }else {
        console.log(`already got ${pageName} baby`)
    }
}




