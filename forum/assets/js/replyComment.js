// get fetch request (function getData) declaration and short cut selectors function $ aand $$ are in ./nav-and-footer/nav.js
let executed;
let parent;
// open reply box to comments (one-level-deep)
comments.addEventListener("click", e => {
  if (e.target.className == "reply") {
    parent = e.target.parentElement.parentElement.parentElement;
    parent.querySelector(
      ".comment-box-wrap.thread-wrap.reply-comment-wrap"
    ).style.display = "block";
    // commentText(topicId);
    if (!executed) {
      replyText(parent, parent.children[1]);
    }
    console.log(parent.parentElement, parent);
  } else if (e.target.className === "btn btn-cancel") {
    // close comment form
    e.target.parentElement.parentElement.parentElement.style.display = "none";
  }
});
let replyVal;

function replyText(el, commentTemplate) {
  executed = true;
  getData(
    `https://erudite-be.herokuapp.com/v1/comments/resource/${el.id}`
  ).then(res => {
    console.log(res);
    res.forEach(data => {
      let replyTexts = `<article id="${data._id}" class="second-level-comment thread-wrap">
         <img src="../images/Ellipse 27 (1).png" alt="avatar" />
         <div class="text">
           <div class="info">
             <b class="name">${data.user.name}</b>
           </div>
           <p class="text-msg">
            ${data.comment}
           </p>
           <br />
           <div class="info">
           <button role="checkbox" type="button" class="like"><i class="fa fa-heart"></i> <span class="count">${data.likes.length}</span> </button>
           </div>
         </article>`;
      commentTemplate.innerHTML += replyTexts;
    });
  });
}

// a functional template to display comment based on level (first or second)
function replyCommentEvent(el, level, parent) {
  replyVal = `<article class="${level}-level-comment thread-wrap"><img src="../images/Ellipse 27 (1).png" alt="avatar" /><div class="text"><div class="info"><b class="name">${
    userAuth.user.name
  }</b></div><p class="text-msg">${
    el.firstElementChild?.value || el.firstElementChild.value
  }</p><br /><div class="info"><button role="checkbox" type="button" class="like"><i class="fa fa-heart"></i>0</button>${
    level === "first"
      ? '<button type="button" class="reply">Reply</button>'
      : ""
  }<p class="time-posted">3 hrs ago</p></div></div></article>
           </div>`;

  // empty or close comment box depending on level
  level === "first" ? (el.firstElementChild.value = "") : "";
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
    userId: JSON.parse(localStorage.getItem("erudite_auth")).user.id,
  };
  let requestBody = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(topicDetails),
    redirect: "follow",
  };
  // activate reply event for general (first-level) comments
  // replyApi(url, requestBody, firstLevelReply, "first", firstLevelComment);
  replyCommentEvent(firstLevelReply, "first", firstLevelComment);
});

let reply;
comments.addEventListener("submit", e => {
  e.preventDefault();
  if (e.target.className === "comment-box reply-comment") {
    reply = e.target.querySelector(".sc-comment-input");
    let url = `https://erudite-be.herokuapp.com/v1/comments/reply/${e.target.parentElement.parentElement.parentElement.id}`;
    let topicDetails = {
      reply: reply.value,
      userId: JSON.parse(localStorage.getItem("erudite_auth")).user.id,
    };
    console.log(e.target.parentElement.parentElement);
    let requestBody = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(topicDetails),
      redirect: "follow",
    };
    console.log(topicDetails);

    // invoke event for second level comment
    replyApi(
      url,
      requestBody,
      e.target,
      "second",
      e.target.parentElement.parentElement
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
