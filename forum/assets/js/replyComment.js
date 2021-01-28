// get fetch request (function getData) declaration and short cut selectors function $ aand $$ are in ./nav-and-footer/nav.js
// let replyClone;
// open reply box to comments (one-level-deep)
let parent;
comments.addEventListener("click", e => {
  if (e.target.className === "reply") {
    parent = e.target.parentElement;
    replyClone = replyCommentWrap.cloneNode(true);
    replyClone.id = "";
    parent.insertAdjacentElement("afterend", replyClone);
    e.target.disabled = true;

    // invoke event for second level comment
  } else if (e.target.className === "btn btn-cancel") {
    // close comment form
    Array.from($$(".reply")).forEach(btn => (btn.disabled = false));
    e.target.parentElement.parentElement.parentElement.style.display = "none";
    // e.target.parentElement.parentElement.parentElement.removeChild(replyClone);
  }
});
let replyVal;

// a functional template to display comment based on level (first or second)
function replyCommentEvent(el, level, parent) {
  el.addEventListener("submit", e => {
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
    // parent.insertAdjacentHTML("afterend", replyVal);
    parent.innerHTML += replyVal;
    Array.from($$(".reply")).forEach(btn => (btn.disabled = false));
  });
}

const firstLevelComment = $(".comments-wrapper");
$("#first-level").addEventListener("submit", e => {
  e.preventDefault();

  const comment = $("#first-level #comment-input");
  let url = `https://erudite-be.herokuapp.com/v1/comments/add/topic/${35467}`;
  let topicDetails = {
    comment: comment.value,
    userId: JSON.parse(localStorage.getItem("erudite_auth")).userId,
  };

  let requestBody = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(topicDetails),
    redirect: "follow",
  };
  // activate reply event for geneeral (first-level) comments
  replyApi(url, requestBody, firstLevelReply, "first", firstLevelComment);
});

Array.from($$(".reply-comment")).forEach(el => {
  el.addEventListener("submit", e => {
    const reply = $("#comment-input");
    let url = `https://erudite-be.herokuapp.com/v1/comments/reply/${35467}`;
    let topicDetails = {
      reply: reply.value,
      userId: JSON.parse(localStorage.getItem("erudite_auth")).userId,
    };

    let requestBody = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(topicDetails),
      redirect: "follow",
    };

    // invoke event for second level comment
    replyApi(
      url,
      requestBody,
      replyClone.firstElementChild,
      "second",
      replyClone
    );
  });
});

function replyApi(url, requestBody, el, level, parent) {
  return fetch(url, requestBody)
    .then(res => res.json())
    .then(response => {
      console.log(response);
      if (response.success == true) {
        displayMsg("success", response.message, $(".error"));
        replyCommentEvent(el, level, parent);
      } else {
        displayMsg("error", response.message, $(".msg-wrap"));
      }
    })
    .catch(err => {
      if (!token) {
        displayMsg(
          "error",
          `pls <a href="../registration/login.html" target="_blank" rel="noopener noreferrer">Login</a>
          or <a href="../registration/signup.html" target="_blank" rel="noopener noreferrer">Sign-up</a> to enable this action`,
          $("form.discuss-pop-up")
        );
      }
      console.log(`Error: ${err}`);
      displayMsg("error", err, $(".msg-wrap"));
    })
    .finally(_ => {
      $("form").reset();
    });
}
