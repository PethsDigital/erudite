// get fetch request (function getData) declaration and short cut selectors function $ aand $$ are in ./nav-and-footer/nav.js

// open reply box to comments (one-level-deep)
let parent;
comments.addEventListener("click", e => {
  if (e.target.className === "reply") {
    parent = e.target.parentElement;
    replyClone = replyCommentWrap.cloneNode(true);
    replyClone.id = "";
    parent.insertAdjacentElement("afterend", replyClone);

    // invoke event for second level comment
  } else if (e.target.className === "btn btn-cancel") {
    // close comment form
    e.target.parentElement.parentElement.parentElement.style.display = "none";
  }
});
let replyVal;

// a functional template to display comment based on level (first or second)
function replyCommentEvent(el, level, parent) {
  replyVal = `<article class="${level}-level-comment thread-wrap"><img src="../images/Ellipse 27 (1).png" alt="avatar" /><div class="text"><div class="info"><b class="name">James Mba</b></div><p class="text-msg">${
    el.firstElementChild.firstElementChild?.value || el.firstElementChild.value
  }</p><br /><div class="info"><button role="checkbox" type="button" class="like"><i class="fa fa-heart"></i>0</button>${
    level === "first"
      ? '<button type="button" class="reply">Reply</button>'
      : ""
  }<p class="time-posted">3 hrs ago</p></div></div></article>
           </div>`;

  // empty or close comment box depending on level
  level === "first"
    ? (el.firstElementChild.value = "")
    : (el.parentElement.parentElement.style.display = "none");
  // parent.insertAdjacentHTML("afterend", replyVal);
  parent.innerHTML += replyVal;
}

const firstLevelComment = $(".comments-wrapper");
$("#first-level").addEventListener("submit", e => {
  e.preventDefault();

  const comment = $("#first-level #comment-input");
  let url = `https://erudite-be.herokuapp.com/v1/comments/add/topic/${topicId}`;
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
  // console.log();
  // replyCommentEvent(firstLevelReply, "first", firstLevelComment);
});

comments.addEventListener("submit", e => {
  e.preventDefault();
  if (e.target.className === "comment-box reply-comment") {
    const reply = $("#comment-input");
    console.log(
      e.target.parentElement.parentElement.parentElement.id,
      e.target.parentElement.parentElement.parentElement
    );
    let url = `https://erudite-be.herokuapp.com/v1/comments/reply/${e.target.parentElement.parentElement.parentElement.id}`;
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
  }
});

function replyApi(url, requestBody, el, level, parent) {
  el.querySelector("button[type='submit']").innerHTML = "loading...";
  el.querySelector("button[type='submit']").disabled = true;
  return fetch(url, requestBody)
    .then(res => res.json())
    .then(response => {
      console.log(response);
      if (response.success == true) {
        displayMsg("success", response.message, $(".msg-wrap"));
        replyCommentEvent(el, level, parent);
        console.log(el, parent, level);
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
      Array.from($$("form")).forEach(form => form.reset());
      el.querySelector("button[type='submit']").textContent = "Post Comment";
      el.querySelector("button[type='submit']").disabled = false;
      console.log(el.querySelector("button[type='submit']"));
    });
}
