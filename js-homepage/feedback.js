// short cut selectors function $ aand $$ are in ./nav-and-footer/nav.js

// grab all elements here with the shortcut selector from above comment
const feedbackModal = $(".feedback-modal");
const showFdNodal = $("#show-fd-modal");

showFdNodal.addEventListener("click", e => {
    feedbackModal.style.cssText = "display: block;";
    $(".overlay").style.display = "block";
});

// close modal function is in the appp.js file