
const shareButton = document.querySelector("#share-btn");
const shareButtonBox = document.querySelector("#share-btn-box");
const sharePopup = document.querySelector("#share-popup");

shareButton.addEventListener("click", function() {
    sharePopup.classList.toggle("show-popup");
    shareButton.classList.toggle("active-share-btn");
});
