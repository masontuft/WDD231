export function enableNavigation() {
  const toggleBtn = document.getElementById("global-nav-toggle");
  const globalNav = document.querySelector(".global-nav");

  if (!toggleBtn || !globalNav) return;

  toggleBtn.addEventListener("click", (ev) => {
    let btn = ev.target;
    if (btn.tagName !== "BUTTON") btn = btn.closest("button");

    const isOpen = globalNav.classList.toggle("show");
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    btn.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");
  });

  globalNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!window.matchMedia("(min-width: 768px)").matches) {
        globalNav.classList.remove("show");
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.setAttribute("aria-label", "Open Menu");
      }
    });
  });
}

export function enableSubmenus() {
  document.querySelectorAll(".global-nav__split-button__toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const submenu = btn.closest("li").querySelector(".global-nav__submenu");
      if (!submenu) return;

      const isOpen = submenu.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });
}

export function setActiveParkNav() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".park-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href !== "#" && page.endsWith(href.replace("./", ""))) {
      link.setAttribute("aria-current", "page");
      link.classList.add("active");
    }
  });
}
