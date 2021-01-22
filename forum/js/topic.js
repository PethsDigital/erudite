// reply to comments (one-level-deep)
replyBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let parent = e.target.parentElement;
    console.log("hii");
    let replyClone = replyCommentWrap.cloneNode(true);
    replyClone.id = "";
    parent.insertAdjacentElement("afterend", replyClone);
    btn.disabled = true;

    // invoke event for second level comment
    replyCommentEvent(replyClone.firstElementChild, "second", replyClone);
    const closeCommentBox = Array.from($$(".btn.btn-cancel"));
    // close comment section
    closeCommentBox.forEach((btns) => {
      btns.addEventListener("click", (e) => {
        e.target.parentElement.parentElement.parentElement.style.display =
          "none";
        btn.disabled = false;
      });
    });
  });
});
let replyVal;
// a functional template to display comment based on level (first or second)
function replyCommentEvent(el, level, parent) {
  el.addEventListener("submit", (e) => {
    e.preventDefault();
    replyVal = `<article class="${level}-level-comment thread-wrap">
                        <img src="../images/Ellipse 27 (1).png" alt="avatar" />
                        <div class="text">
                          <div class="info">
                            <b class="name">James Mba</b>
                          </div>
                          <p class="text-msg">
                           ${
                             el.firstElementChild.firstElementChild?.value ||
                             el.firstElementChild.value
                           }
                          </p>
                          <br />
                          <div class="info">
                            <button type="button" class="like">Like</button>
                            ${
                              level === "first"
                                ? '<button type="button" class="reply">Reply</button>'
                                : ""
                            }
                            <p class="time-posted">3 hrs ago</p>
                            <p class="time-posted like-count">22 Likes</p>
                        </div>
                        </div>
                      </article>`;
    parent.insertAdjacentHTML("afterend", replyVal);
    replyBtn.forEach((btn) => (btn.disabled = false));
    level === "second"
      ? (el.style.display = "none")
      : (el.firstElementChild.value = "");
  });
}
// replyCommentEvent(replyVal, "second", replyVal);

const firstLevelComment = Array.from($$(".first-level-comment"));

// activate reply event for geneeral (first-level) comments
replyCommentEvent(
  firstLevelReply,
  "first",
  firstLevelComment[firstLevelComment.length - 1]
);
