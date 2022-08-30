import { useLoaderData } from "@remix-run/react";
import DisplayData from "../../../components/displayData";
import users from "public/images/users_noBorder.png"
import {Context} from '../../data-context';
import {useContext} from 'react'
import Timeframe from '../../../components/timeframe';
import devSmall from "public/images/small-dev-logo.png"
import designSmall from "public/images/design-small.png"
import securitySmall from "public/images/security-small.png"
import blockchainSmall from "public/images/blockchain-small.png"
import dev40 from "public/images/dev40.png"
import dev64 from "public/images/dev64.png"
import security40 from "public/images/security40.png"
import des40 from "public/images/design40.png"
import block40 from "public/images/blockchain40.png"


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

    const { setInitialGrowth, growthRecords, setTimeFrame } = useContext(Context);

//   const { records, progress, page, title, dept, course, setTimeFrame, filteredRecords, paused } = useContext(Context);
    
    let {records}  = useLoaderData()

    let filteredRecords = records.filter(fields => "XD" && "FSJS" ? fields["Course Subject"] === "XD" || fields["Course Subject"] === "FSJS" && fields["Simple Status"] === "In Progress" : fields)
    let pausedRecords = records.filter(fields => "Paused" ? fields["Simple Status"] === "Paused" : fields)
    let devTotalRecords = records.filter(fields => "FSJS" && "In Progress" ? fields["Course Subject"] === "FSJS" && fields["Simple Status"] === "In Progress" : fields )
    let designTotalRecords =records.filter(fields => "XD" && "In Progress" ? fields["Course Subject"] === "XD" && fields["Simple Status"] === "In Progress" : fields)
    let securityTotalRecords = records.filter(fields => "Security" && "In Progress" ? fields["Course Subject"] === "Security" && fields["Simple Status"] === "In Progress" : fields)
    let blockchainTotalRecords = records.filter(fields => "Blockchain" && "In Progress" ? fields["Course Subject"] === "Blockchain" && fields["Simple Status"] === "In Progress" : fields)

    
    return (
        <main>
            <Timeframe timeframe={setTimeFrame} />
          {/* NOTE:  These two containers need to be revised to reflect the revisions in figma */}
          <div className = "overview-cards-container">
                        <div className = "overview-cards-wrapper">
                            <div className = "small-card">
                                <div className = "card-main">
                                    <div>
                                        <h3 className = "card-title">Total Students</h3>
                                        <h3 className = "card-nums" style = {{fontSize: "80px", height: "80px", width: "143px", lineHeight: "44px"}}>{filteredRecords.length}</h3>
                                    </div>
                                
                                    <div id = "program-links">
                                        <img className = "link-item block-link"src = {blockchainSmall} alt = "rubric-cube"/> 
                                        <img className = "link-item sec-link" src = {securitySmall} alt = "open-lock"/>
                                        <img className = "link-item des-link"src = {designSmall} alt = "arrow" />                                 
                                        <img className = "link-item dev-link"src = {devSmall} alt = "open-frag"/>
                                    </div>
                                </div>

                                <div className = "stats-container"><p className = "card-compared-stat">+5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>Compared to last month</span></p></div>

</div>
                                     
                            <div className = "small-card">
                                <h3 className = "card-title education completed">Completed Stage 1</h3>
                                <h3 className = "card-nums" style = {{fontSize: "44px"}}>{filteredRecords.filter(fields => fields["Simple Status"] === "Completed - Level 8" || fields["Simple Status"] === "Jobbed Out").length}</h3>
                                <p className = "card-compared-stat">+10%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>Compared to last month</span></p>
                            </div>

                       
                                <div className = "small-card">
                                    <h3 className = "card-title education active">Active Students</h3>
                                    <h3 className = "card-nums" >{filteredRecords.filter(fields => fields["Simple Status"] === "In Progress").length}</h3>
                                    <p className = "card-compared-stat">+10%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>From last month</span></p>                       
                                </div>

                                <div className = "small-card">
                                    <h3 className = "card-title education paused">Paused Students</h3>
                                    <h3 className = "card-nums" > {pausedRecords.length} </h3>
                                    <p className = "card-compared-stat" style = {{color: "red"}}>-5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>From last month</span></p>                       
                                </div>


                            <div className = "overview-cards-wrapper courses" >
        
                                 <div className = "small-card">
                                    <img src = {dev40} alt = "devLogo" />
                                    <h3 className = "card-title education paused">Development</h3>
                                    <h3 className = "card-nums" style = {{fontSize: "32px"}}> {devTotalRecords.length} </h3>
                                    <p className = "card-compared-stat" style = {{color: "red"}}>-5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>From last month</span></p>                       
                                </div>
                                <div className = "small-card">
                                    <img src = {des40} alt = "desLogo" />
                                    <h3 className = "card-title education paused">Design</h3>
                                    <h3 className = "card-nums" style = {{fontSize: "32px"}}> {designTotalRecords.length} </h3>
                                    <p className = "card-compared-stat" style = {{color: "red"}}>-5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>From last month</span></p>                       
                                </div>
                                <div className = "small-card">
                                    <img src = {security40} alt = "secLogo" />
                                    <h3 className = "card-title education paused">Security</h3>
                                    <h3 className = "card-nums"style = {{fontSize: "32px"}} > {securityTotalRecords.length} </h3>
                                    <p className = "card-compared-stat" style = {{color: "red"}}>-5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>From last month</span></p>                       
                                </div>
                                <div className = "small-card">
                                    <img src = {block40} alt = "blockchainLogo" />
                                    <h3 className = "card-title education paused">Blockchain</h3>
                                    <h3 className = "card-nums" style = {{fontSize: "32px"}}> {blockchainTotalRecords.length} </h3>
                                    <p className = "card-compared-stat" style = {{color: "red"}}>-5%<span style = {{color: "black", marginLeft: "4px", fontFamily: "aktiv-grotesk,sans-serif"}}>From last month</span></p>                       
                                </div>
                            

                            </div>
                               
                        </div>
                        </div> 
                       

                        
          
              
        </main>
    );
}