import { Link } from "@remix-run/react";
import homeLogo from "public/images/home.png"

export default function HomeIndex() {
  return (
    <div className = "dashboard-container">
      <div className = "home-header">
        <img src = {homeLogo} alt= "homelogo" />
        <h1>DASHBOARDS HOME PAGE</h1>
      </div>
    </div>
  );
}