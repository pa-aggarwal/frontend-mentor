async function getJSON() {
    const response = await fetch("./data.json");
    const json = await response.json();
    return json;
}

function convertNameToClass(name) {
    return name.replaceAll(" ", "-").toLowerCase();
}

function createTimeTracker(tracker) {
    const { title, current, previous } = tracker;
    return (`
        <section class="track-section ${convertNameToClass(title)}">
            <div class="track-info">
                <div class="track-topbar">
                    <h2 class="track-title">${title}</h2>
                    <button type="button" class="track-btn">
                        <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg>
                    </button>
                </div>
                <time datetime="PT${current}H" class="duration-now">${current}hrs</time>
                <span class="small-light-text">
                    <span class="timeframe-prev">Last Week</span> - 
                    <time datetime="PT${previous}H" class="duration-prev">${previous}hrs</time>
                </span>
            </div>
        </section>
    `);
}

function createTimeframeInput(tf, isChecked) {
    const properCaseTf = tf[0].toUpperCase() + tf.substring(1).toLowerCase();
    const checked = (isChecked) ? "checked" : "";
    return (`
        <div class="timeframe">
            <input type="radio" id="${tf}" name="timeframe" value="${tf}" ${checked}>
            <label for="${tf}">${properCaseTf}</label>
        </div>
    `);
}

function addTrackersToDashboard(trackers) {
    const dashboard = document.querySelector(".dashboard");
    for (let tracker of trackers) {
        const trackerHTML = createTimeTracker(tracker);
        dashboard.insertAdjacentHTML("beforeend", trackerHTML);
    }
}

function addTimeframesToForm(timeframes, checkedTf) {
    const timeForm = document.querySelector(".timeframe-form");
    for (let tf of timeframes) {
        const tfHTML = createTimeframeInput(tf, tf === checkedTf);
        timeForm.insertAdjacentHTML("beforeend", tfHTML);
    }
    return timeForm;
}

function updateTimeElement(container, selector, time) {
    const element = container.querySelector(selector);
    element.setAttribute("datetime", `PT${time}H`);
    element.textContent = `${time}hrs`;
}

function updateDashboardTimeframe(timeframe, newTrackers) {
    const prevTfText = {
        "daily": "Yesterday", "weekly": "Last Week", "monthly": "Last Month"
    }[timeframe];
    for (let tracker of newTrackers) {
        const { title, current, previous } = tracker;
        const container = document.querySelector(`.${convertNameToClass(title)}`);
        updateTimeElement(container, ".duration-now", current);
        updateTimeElement(container, ".duration-prev", previous);
        container.querySelector(".timeframe-prev").textContent = prevTfText;
    }
}

const getTrackersForTimeframe = (timeframe, data) => {
    return data.map(function({ title, timeframes }) {
        return {
            "title": title,
            "current": timeframes[timeframe].current,
            "previous": timeframes[timeframe].previous
        };
    });
}

async function main() {
    const data = await getJSON();
    const timeframes = Object.keys(data[0].timeframes);

    // Default weekly trackers shown in dashboard
    const form = addTimeframesToForm(timeframes, "weekly");
    const trackers = getTrackersForTimeframe("weekly", data);
    addTrackersToDashboard(trackers);

    // Updates times shown in trackers using timeframe labels
    form.addEventListener("click", function(event) {
        const newTimeframe = event.target.getAttribute("for");
        if (!newTimeframe) return undefined;
        const newTrackers = getTrackersForTimeframe(newTimeframe, data);
        updateDashboardTimeframe(newTimeframe, newTrackers);
    });
}

main();
