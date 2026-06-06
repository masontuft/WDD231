import "../css/style.css";
import "../css/home.css";
import { getParkData, getInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";

function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  introEl.innerHTML = `<h1>${data.fullName}</h1>
  <p>${data.description}</p>`;
}

function setParkInfoLinks(data) {
  const infoEl = document.querySelector(".info");
  const html = data.map(mediaCardTemplate);
  infoEl.insertAdjacentHTML("afterbegin", html.join(""));
}

function enableNavigation() {
  const toggleBtn = document.getElementById("global-nav-toggle");
  const globalNav = document.querySelector(".global-nav");

  toggleBtn.addEventListener("click", (ev) => {
    let btn = ev.target;
    if (btn.tagName !== "BUTTON") {
      btn = btn.closest("button");
    }

    const isOpen = globalNav.classList.toggle("show");
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    btn.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");
  });
}

async function init() {
  const parkData = await getParkData();
  setHeaderFooter(parkData);
  setParkIntro(parkData);
  setParkInfoLinks(getInfoLinks(parkData.images));
}

init();
enableNavigation();

