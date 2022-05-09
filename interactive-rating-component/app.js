(function() {

    const thankComponent = document.querySelector("#thank-state");
    const ratingComponent = document.querySelector("#rating-state");
    const ratingForm = document.querySelector("#rating-form");

    ratingForm.addEventListener("submit", function(event) {
        // Prevent browser from refreshing the page
        event.preventDefault();
        const selector = `input[name="rating"]:checked`
        const checkedInput = document.querySelector(selector);

        // There must be a checked radio input to show thank you state
        if (checkedInput !== null) {
            const userRating = document.querySelector("#rating-chose");
            userRating.textContent = checkedInput.getAttribute("value");
            ratingComponent.classList.add("hide");
            thankComponent.classList.remove("hide");
        }
    });

})();
