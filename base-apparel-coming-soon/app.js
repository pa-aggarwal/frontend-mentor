(function() {

    const section = document.querySelector(".launch-section");
    const container = document.querySelector("#container-mobile");
    const launchText = document.querySelector("#launch-text");
    const heroWrapper = document.querySelector("#hero-wrapper");
    const email = document.querySelector("#email");
    const feedback = document.querySelector("#feedback");
    const emailForm = document.querySelector("#email-form");
    const errorIcon = document.querySelector("#icon-error");

    const heroImage = (size) => `./images/hero-${size}.jpg`;
    const errorMessage = "Please provide a valid email";
    const successMessage = "Your email has been added to our list!";
    const mobileBreakpoint = 1000;
    const throttleDelay = 250;
    let isThrottled = false;

    function showMobileView() {
        container.insertBefore(heroWrapper, launchText);
        heroWrapper.firstElementChild
            .setAttribute("src", heroImage("mobile"));
        section.classList.remove("container-desktop");
    }

    function showDesktopView() {
        container.insertAdjacentElement("afterend", heroWrapper);
        heroWrapper.firstElementChild
            .setAttribute("src", heroImage("desktop"));
        section.classList.add("container-desktop");
    }

    email.addEventListener("invalid", function(event) {
        feedback.textContent = errorMessage;
        email.classList.add("input-email-invalid");
        feedback.classList.add("feedback-show");
        feedback.classList.add("feedback-error");
        errorIcon.classList.add("icon-error-show");
        event.preventDefault();
    });

    email.addEventListener("focus", function() {
        // Hide the error icon when user focuses input to enter a new email
        errorIcon.classList.remove("icon-error-show");
        email.classList.remove("input-email-invalid");
    });

    emailForm.addEventListener("submit", function(event) {
        if (this.reportValidity()) {
            feedback.textContent = successMessage;
            feedback.classList.add("feedback-show");
            feedback.classList.remove("feedback-error");
        }
        event.preventDefault();
    });

    window.addEventListener("resize", function() {
        // Throttling minimizes number of times resize event fires
        if (!isThrottled) {
            (this.innerWidth <= mobileBreakpoint) ?
                showMobileView() : showDesktopView();
            isThrottled = true;
            this.setTimeout(() => { isThrottled = false; }, throttleDelay);
        }
    });

    if (window.innerWidth <= mobileBreakpoint) {
        showMobileView();
    } else {
        showDesktopView();
    }

})();
