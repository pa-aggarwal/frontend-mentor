(function() {

    const questionContainer = document.querySelector(".faq-questions");
    const card = document.querySelector(".card");
    const breakpointSize = 950;

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

    function setCardNewHeight(answer, isLarger) {
        const computedStyles = window.getComputedStyle(answer);
        // 15px accounts for margin bottom of answer element
        const addedHeight = parseInt(computedStyles.height) + 15;
        const newHeight = (
            parseInt(window.getComputedStyle(card).minHeight) +
            ((isLarger) ? addedHeight : (-addedHeight))
        );
        card.style.minHeight = `${newHeight}px`;
    }

    function toggleOpenAnswer(buttonParent) {
        const answerID = buttonParent.getAttribute("aria-controls");
        const answer = document.querySelector(`#${answerID}`);
        if (window.innerWidth <= breakpointSize) {
            if (answer.hasAttribute("hidden")) {
                answer.removeAttribute("hidden");
                setCardNewHeight(answer, true);
            } else {
                setCardNewHeight(answer, false);
                answer.setAttribute("hidden", "");
            }
        } else {
            answer.toggleAttribute("hidden");
        }
        buttonParent.classList.toggle("selected-button");
    }

    /* Use event delegation to find which button (if any) was clicked
       to prevent adding event listeners for each question button */
    questionContainer.addEventListener("click", function(event) {
        const buttonParent = getButtonParent(event.target);
        if (buttonParent !== null) {
            toggleOpenAnswer(buttonParent)
        }
    });

})();
