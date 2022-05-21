const menuButton = document.querySelector("#menu");
const closeButton = document.querySelector("#close");
const transparentBg = document.querySelector("#transparent-bg");
const sidePanel = document.querySelector("#side-panel");
const sideNav = document.querySelector(".side-nav");

function toggleSidePanel(event) {
    event.stopPropagation();
    transparentBg.classList.toggle("hidden");
    sidePanel.classList.toggle("hidden");
    sidePanel.classList.toggle("side-panel-flex");
}

function moveSidePanel() {
    const topNav = document.querySelector(".top-nav");
    topNav.removeChild(menuButton);
    const topNavLeft = document.createElement("div");
    topNavLeft.classList.add("top-nav-left");
    topNavLeft.appendChild(document.querySelector("#logo"));
    topNavLeft.appendChild(sideNav);
    topNav.appendChild(topNavLeft);
    topNav.appendChild(document.querySelector(".account-links"));
}

menuButton.addEventListener("click", toggleSidePanel);
closeButton.addEventListener("click", toggleSidePanel);

document.body.addEventListener("click", function(event) {
    // Close the side panel if it's showing and user clicks outside of it
    if (!sidePanel.classList.contains("hidden")) {
        if (event.target.closest("#side-panel") === null) {
            closeButton.click();
        }
    }
});

sideNav.addEventListener("click", function(event) {
    const dropdown = event.target.closest(".dropdown");
    if (dropdown && !event.target.closest(".dropdown-list")) {
        const dropdownList = dropdown.querySelector(".dropdown-list");
        dropdownList.classList.toggle("hidden");
        const arrow = dropdown.querySelector(".icon-arrow");
        const arrowDir = (arrow.src.includes("arrow-down")) ? "up" : "down";
        arrow.src = `./images/icon-arrow-${arrowDir}.svg`;
    }
});

if (window.innerWidth >= 1000) {
    moveSidePanel();
}
