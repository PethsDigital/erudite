// short cut selectors function $ aand $$ are in ./nav-and-footer/nav.js

// grab all elements here with the shortcut selector from above comment
const discussModal = $(".discuss-pop-up");
const discussModalbtn = $(".st-discuss");
const categoryInput = Array.from($$("input[type='radio']"));
const discussMessageInput = $(".discuss-pop-up textarea");
const firstLevelReply = $("#first-level");
// const replyBtn = Array.from($$(".reply"));
const comments = $(".comments");
const replyCommentWrap = $("#reply-comment-wrap");
let replyClone;

discussModalbtn.addEventListener("click", (e) => {
  discussModal.style.cssText = "display: block;";
  $(".overlay").style.display = "block";
});

// close modal section
Array.from($$(".close-msg")).forEach((btn) => {
  btn.addEventListener("click", () => {
    discussModal.style.cssText = "display: none;";
    $(".overlay").style.display = "none";
    discussMessageInput.value = "";
    categoryInput.forEach((radio) => (radio.checked = false));
  });
});
