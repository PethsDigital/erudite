// reply to comments (one-level-deep)
comments.addEventListener("click", (e) => {
  if (e.target.className === "reply") {
    let parent = e.target.parentElement;
    let replyClone = replyCommentWrap.cloneNode(true);
    replyClone.id = "";
    parent.insertAdjacentElement("afterend", replyClone);
    e.target.disabled = true;

    // invoke event for second level comment
    replyCommentEvent(replyClone.firstElementChild, "second", replyClone);

  } else if (e.target.className === "btn btn-cancel") {

    // close comment form
    Array.from($$(".reply")).forEach((btn) => (btn.disabled = false));
    e.target.parentElement.parentElement.parentElement.style.display = "none";
  }
});
let replyVal;

// a functional template to display comment based on level (first or second)
function replyCommentEvent(el, level, parent) {
  el.addEventListener("submit", (e) => {
    e.preventDefault();
   
    replyVal = `<article class="${level}-level-comment thread-wrap"><img src="../images/Ellipse 27 (1).png" alt="avatar" /><div class="text"><div class="info"><b class="name">James Mba</b></div><p class="text-msg">${
      el.firstElementChild.firstElementChild?.value ||
      el.firstElementChild.value
    }</p><br /><div class="info"><button type="button" class="like">Like</button>${
      level === "first"
        ? '<button type="button" class="reply">Reply</button>'
        : ""
    }<p class="time-posted">3 hrs ago</p><p class="time-posted like-count">22 Likes</p></div></div></article>`;

    // empty or close comment box depending on level
    level === "first"
    ? (el.firstElementChild.value = "")
    : (el.style.display = "none");
    parent.insertAdjacentHTML("afterend", replyVal);
    replyBtn.forEach((btn) => (btn.disabled = false));
  });
}

const firstLevelComment = Array.from($$(".first-level-comment"));

// activate reply event for geneeral (first-level) comments
replyCommentEvent(
  firstLevelReply,
  "first",
  firstLevelComment[firstLevelComment.length - 1]
);
