async function getJSON() {
    const response = await fetch("./data.json");
    const json = await response.json();
    return json;
}

function createTimeTracker(tracker) {
    const { title, current, previous } = tracker;
    return (`
        <section class="track-section ${title.replaceAll(" ", "-").toLowerCase()}">
            <div class="track-info">
                <div classs="track-topbar">
                    <h2 class="track-title">${title}</h2>
                    <button type="button" class="track-edit">
                        <img src="./images/icon-ellipsis.svg" alt="More information about ${title} time tracker">
                    </button>
                </div>
                <time datetime="PT${current}H" class="duration-now">${current}hrs</time>
                <span>
                    <span class="timeframe-prev">Last Week</span> - 
                    <time datetime="PT${previous}H" class="duration-prev">${previous}hrs</time></span>
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
    const timeForm = document.querySelector(".time-form");
    for (let tf of timeframes) {
        const tfHTML = createTimeframeInput(tf, tf === checkedTf);
        timeForm.insertAdjacentHTML("beforeend", tfHTML);
    }
    return timeForm;
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
}

main();
