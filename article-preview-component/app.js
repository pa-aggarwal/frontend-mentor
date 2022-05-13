(function() {

    const shareButton = document.querySelector("#share-btn");
    const shareButtonBox = document.querySelector("#share-btn-box");
    const sharePopup = document.querySelector("#share-popup");
    const footer = document.querySelector("#component-footer");
    const footerInfo = document.querySelector("#component-footer-info");
    let isShowingShare = false;

    function transferChildren(parentFrom, parentTo) {
        while (parentFrom.firstChild !== null) {
            let child = parentFrom.removeChild(parentFrom.firstChild);
            parentTo.appendChild(child);
        }
    }

    function showShareOnMobile() {
        let shareContent;
        sharePopup.classList.remove("show-popup-desktop");
        sharePopup.classList.toggle("show-popup-mobile");
        footer.classList.toggle("component-footer");
        footerInfo.classList.toggle("no-display");

        if (!isShowingShare) {
            shareContent = document.createElement("div");
            shareContent.classList.add("share-left");
            transferChildren(sharePopup, shareContent);
            shareButtonBox.removeChild(shareButton);
            sharePopup.appendChild(shareContent);
            sharePopup.appendChild(shareButton);
            isShowingShare = true;
        } else {
            shareContent = sharePopup.removeChild(sharePopup.firstChild);
            sharePopup.removeChild(shareButton);
            shareButtonBox.appendChild(shareButton);
            transferChildren(shareContent, sharePopup);
            isShowingShare = false;
        }
    }

    shareButton.addEventListener("click", function() {
        this.classList.toggle("active-share-btn");
        if (window.innerWidth > 650) {
            sharePopup.classList.toggle("show-popup-desktop");
        } else {
            showShareOnMobile();
        }
    });

})();
