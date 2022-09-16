// get fetch request (function getData) declaration and short cut selectors function $ aand $$ are in ./nav-and-footer/nav.js
let parent;
let replyFormPresent = true;
// open reply box to comments (one-level-deep)
comments.addEventListener("click", e => {
  if (e.target.className == "reply") {
    parent = e.target.parentElement.parentElement.parentElement;
    if (replyFormPresent) {
      let textDiv = e.target.parentElement;
      let replyForm = document.createElement("div");
      replyForm.className = "comment-box-wrap thread-wrap reply-comment-wrap";
      replyForm.innerHTML = `<form class="comment-box reply-comment">
      <textarea
      required
      class="sc-comment-input"
      
      placeholder="Type here to comment or reply the question"
      ></textarea>
      <div class="btn-group">
        <button class="btn submit-reply" type="submit">
        Post comment
        </button>
        <button
          type="reset"
          class="btn btn-cancel"
          type="button"
          >
          Cancel
          </button>
          </div>
          </form>
          <br />`;
      textDiv.insertAdjacentElement("afterend", replyForm);
      replyFormPresent = false;
    }
    if (!parent.className.includes("executed")) {
      replyText(parent, parent.children[1]);
    }
  } else if (e.target.className === "btn btn-cancel") {
    // close comment form
    e.target.parentElement.parentElement.parentElement.parentElement.removeChild(
      e.target.parentElement.parentElement.parentElement
    );
    replyFormPresent = true;
  }
});
let replyVal;

function replyText(el, commentTemplate) {
  let response;
  parent.classList.add("executed");

  getData(`https://erudite-be.herokuapp.com/v1/comments/resource/${el.id}`)
    .then(res => {
      console.log(res);
      response = res;
      if (res.length > 0) {
        $(`[id="${parent.id}"] .loader`).style.display = "flex";
      }
      return res.map(el => el.userId);
    })
    .then(arr => {
      return fetchUsersData(arr).then(result => {
        result.forEach((user, i) => {
          if (user.success) {
            let replyTexts = `<article id="${
              response[i]._id
            }" class="second-level-comment thread-wrap">
            <img src="${user.data.avatar}" alt="avatar" />
            <div class="text">
              <div class="info">
                <b class="name">${user.data.username}</b>
              </div>
              <p class="text-msg">
                ${response[i].comment}
              </p>
              <br />
              <div class="info">
              <input type="checkbox" onChange="likeFunc(this)" value="None" name="like-btn" id="${
                response[i]._id + "1"
              }"/>
              <label for="${response[i]._id + "1"}" type="button" class="like ${
              userAuth && response[i].likes.includes(userAuth.user.id)
                ? "liked"
                : ""
            }"><i class="fa fa-heart"></i> <span class="count"> ${
              response[i].likes.length
            }</span> </label>
          <p class="time-posted">${displayTime(response[i].createdAt)}</p>
              </div>
            </article>`;
            commentTemplate.innerHTML += replyTexts;
          }
          $(`[id="${parent.id}"] .loader`).style.display = "none";
        });
      });
    });
}
// a functional template to display comment based on level (first or second)
function replyCommentEvent(el, level, parent, id) {
  replyVal = `<article id="${id}" class="${level}-level-comment thread-wrap"><img src="${
    userAuth.user.avatar
  }" alt="avatar" /><div class="text"><div class="info"><b class="name">${
    userAuth.user.username
  }</b></div><p class="text-msg">${
    el.firstElementChild?.value || el.firstElementChild.value
  }</p><br /><div class="info"><input type="checkbox" onChange="likeFunc(this)" value="None" name="like-btn" id="${
    id + "1"
  }"/>
        <label for="${
          id + "1"
        }" type="button" class="like"><i class="fa fa-heart"></i> <span class="count">0</span> </label>${
    level === "first"
      ? '<button type="button" onClick="" class="reply">Reply</button>'
      : ""
  }<p class="time-posted">0 min ago</p></div></div></article>
           </div>`;

  // empty or close comment box depending on level
  level === "first" ? (el.firstElementChild.value = "") : "";
  parent.innerHTML += replyVal;
}

const firstLevelComment = $(".comments-wrapper");
$("#first-level").addEventListener("submit", e => {
  e.preventDefault();
  if (!userAuth) {
    displayMsg(
      "error",
      `pls Login to enable this action`,
      $("form.discuss-pop-up")
    );
    setTimeout(
      () =>
        (window.location.pathname = window.location.pathname.replace(
          "forum/topic.html",
          "registration/login.html"
        )),
      1000
    );
  }

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
  replyApi(url, requestBody, firstLevelReply, "first", firstLevelComment);
});

let reply;
comments.addEventListener("submit", e => {
  e.preventDefault();
  if (!userAuth) {
    displayMsg(
      "error",
      `pls Login to enable this action`,
      $("form.discuss-pop-up")
    );
    setTimeout(
      () =>
        (window.location.pathname = window.location.pathname.replace(
          "forum/topic.html",
          "registration/login.html"
        )),
      1000
    );
  }
  if (userAuth && e.target.className === "comment-box reply-comment") {
    reply = e.target.querySelector(".sc-comment-input");
    let url = `https://erudite-be.herokuapp.com/v1/comments/reply/${e.target.parentElement.parentElement.parentElement.id}`;

    let topicDetails = {
      reply: reply.value,
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
        displayMsg("success", response.data.message, $(".msg-wrap"));
        replyCommentEvent(el, level, parent, response.data.id);
      } else {
        displayMsg("error", response.message, $(".msg-wrap"));
      }
    })
    .catch(err => {
      console.log(`Error: ${err}`);
      displayMsg(
        "error",
        "Something went wrong, pls try again",
        $(".msg-wrap")
      );
    })
    .finally(_ => {
      Array.from($$("form")).forEach(form => form.reset());
      Array.from(
        $$(".comment-box.reply-comment .submit-reply, #first-level .reply")
      ).forEach(el => {
        el.disabled = false;
        el.textContent = "Post Comment";
      });
    });
}
