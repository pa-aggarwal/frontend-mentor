(function() {

    const questionContainer = document.querySelector(".faq-questions");

    function getButtonParent(eventTarget) {
        /* Button only has 2 child elements so check if
           element clicked is button or has button as parent */
        if (eventTarget.nodeName === "BUTTON") {
            return eventTarget;
        } else if (eventTarget.parentElement.nodeName === "BUTTON") {
            return eventTarget.parentElement;
        } else {
            return null;
        }
    }

    function toggleOpenQuestion(buttonParent) {
        const questionID = buttonParent.getAttribute("aria-controls");
        const question = document.querySelector(`#${questionID}`);
        question.toggleAttribute("hidden");
        buttonParent.classList.toggle("selected-button");
    }

    /* Use event delegation to find which button (if any) was clicked
       to prevent adding event listeners for each question button */
    questionContainer.addEventListener("click", function(event) {
        const buttonParent = getButtonParent(event.target);
        if (buttonParent !== null) {
            toggleOpenQuestion(buttonParent)
        }
    });

})();
