
const errorMessage = "Please provide a valid email";
const successMessage = "Your email has been added to our list!";
const email = document.querySelector("#email");
const feedback = document.querySelector("#feedback");
const emailForm = document.querySelector("#email-form");
const errorIcon = document.querySelector("#icon-error");

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
