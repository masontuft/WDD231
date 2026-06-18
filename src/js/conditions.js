import "../css/style.css";
import "../css/conditions.css";
import { getParkData, getAlerts, getVisitorCenterData } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { alertTemplate, visitorCenterTemplate, activityTemplate } from "./templates.mjs";
import { enableNavigation, enableSubmenus, setActiveParkNav } from "./navigation.mjs";

function setAlerts(alerts) {
  const el = document.querySelector(".alert-list");
  if (!alerts?.length) { el.innerHTML = "<li>No current alerts.</li>"; return; }
  el.innerHTML = alerts.map(alertTemplate).join("");
}

function setVisitorCenters(centers) {
  const el = document.querySelector(".visitor-center-list");
  if (!centers?.length) { el.innerHTML = "<p>No visitor center information available.</p>"; return; }
  el.innerHTML = centers.map(visitorCenterTemplate).join("");
}

function setActivities(activities) {
  const el = document.querySelector(".activity-list");
  if (!activities?.length) { el.innerHTML = "<li>No activities listed.</li>"; return; }
  el.innerHTML = activities.map(activityTemplate).join("");
}

async function init() {
  const [parkData, alerts, visitorCenters] = await Promise.all([
    getParkData(),
    getAlerts(),
    getVisitorCenterData()
  ]);
  setHeaderFooter(parkData);
  setAlerts(alerts);
  setVisitorCenters(visitorCenters);
  setActivities(parkData.activities);
  enableNavigation();
  enableSubmenus();
  setActiveParkNav();
}

init();
