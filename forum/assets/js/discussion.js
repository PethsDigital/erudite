// get fetch request (function getData) declaration and short cut selectors function $ aand $$ are in ./nav-and-footer/nav.js

// template function to get topics depending on route
let topicId = window.location.href.split("?").pop().split("=")[1];

let response;
getData(`https://erudite-be.herokuapp.com/v1/topics/${topicId}`)
  .then(json => {
    console.log(json);
    if (!json) {
      $(".main-discussion.right").innerHTML = `<div class="oops">
    <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" class="heart"
    width="100"
    height="100" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M23.5,27.5H6.5l-1-15.19a.76.76,0,0,1,.77-.81H10a1.11,1.11,0,0,1,.89.44l1.22,1.56H23.5v2"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M26.3,20.7l.84-3.2H9.25L6.5,27.5H23.41a1.42,1.42,0,0,0,1.37-1.06l.76-2.88"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M16.5,24.5h0a1.42,1.42,0,0,1,2,0h0"/><line x1="13.5" x2="14.5" y1="21.5" y2="21.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><line x1="20.5" x2="21.5" y1="21.5" y2="21.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M20.62,3.61C18.25,4,16.5,5.37,16.5,7a2.57,2.57,0,0,0,.7,1.7l-.7,2.8,2.86-1.43A8.12,8.12,0,0,0,22,10.5c3,0,5.5-1.57,5.5-3.5,0-1.6-1.69-2.95-4-3.37"/><line x1="21.25" x2="22.75" y1="6.25" y2="7.75" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><line x1="22.75" x2="21.25" y1="6.25" y2="7.75" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <br />
    <h1>Oops!</h1>
    <p>Topic not found</p>
    <p>Click on "Start-discussion" to create a new topic for discussion</p>
    </div>`;
    } else {
      $(".breadcrumb-link.topic").innerHTML += json.title;
      $(".breadcrumb-link.forum-category").innerHTML = json.forumName;
      $(".breadcrumb-link.forum-category").setAttribute(
        "href",
        `./forum-topics.html?id=${json.forumId}`
      );
      response = json;
      return getData(
        `https://erudite-be.herokuapp.com/v1/users/${json.userId}`
      );
    }
  })
  .then(user => {
    let parentEl = $(".description");
    let topicDescription = `<article class="main-question thread-wrap">
            <img src="${user.avatar}" alt="avatar" />
            <div class="text">
              <div class="info">
                <b class="name">${user.username}</b>
                <p class="time-posted">${displayTime(response.createdAt)}</p>
              </div>
              <p class="text-msg">
               ${response.description}
              </p>
            </div>
          </article>`;
    parentEl.innerHTML += topicDescription;
    // comments box
    $("#first-level-cm img").src =
      userAuth && userAuth.user.avatar != ""
        ? userAuth.user.avatar
        : "https://res.cloudinary.com/tomiwadev/image/upload/v1612047488/erudite/Profile_pic_1_xlepwh.png";
    $("#com-num").innerHTML = `${
      response.comments.length > 1
        ? response.comments.length + " Comments"
        : response.comments.length + " Comment"
    } `;
  });

//
(function () {
  let response;

  // display first level comments on load
  getData(`https://erudite-be.herokuapp.com/v1/comments/resource/${topicId}`)
    .then(json => {
      response = json;
      console.log(json);
      return json.map(el => el.userId);
    })
    .then(arr => {
      let commentWrap = $(".comments-wrapper");
      return fetchUsersData(arr).then(result => {
        result.forEach((user, i) => {
          if (user.success) {
            let commentTemplate = `<article id="${
              response[i]._id
            }" class="first-level-comment thread-wrap">
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
                <button type="button" class="reply"><span class="stat"><i class="fas fa-comment-alt"></i>
                &nbsp;&nbsp; <p>${response[i].replies.length}</p> </button>
                 <p class="time-posted">${displayTime(
                   response[i].createdAt
                 )}</p></span>
              </div>
            <br>
            <div class="loader"><span class="circle"></span></div>
            </div>
            </article>`;
            commentWrap.innerHTML += commentTemplate;
          }
        });
      });
    });
})();

// like and unlike
function likeFunc(e) {
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
  let commentId = e.parentElement.parentElement.parentElement.id;
  let requestBody = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({
      userId: JSON.parse(localStorage.getItem("erudite_auth")).user.id,
    }),
    redirect: "follow",
  };

  if (e.parentElement.children[1].className.includes("liked")) {
    likeUnlike(
      e.parentElement.children[1],
      `https://erudite-be.herokuapp.com/v1/comments/unlike/${commentId}/`,
      requestBody
    );

    setTimeout(
      () => e.parentElement.children[1].classList.remove("liked"),
      1000
    );
  } else {
    likeUnlike(
      e.parentElement.children[1],
      `https://erudite-be.herokuapp.com/v1/comments/like/${commentId}/`,
      requestBody
    );

    setTimeout(() => e.parentElement.children[1].classList.add("liked"), 1000);
  }
}

async function likeUnlike(el, url, requestBody) {
  try {
    const res = await fetch(url, requestBody);
    const response = await res.json();
    console.log(response);
    if (response.success == true) {
      el.children[1].innerHTML = response.data.likes.length;
      el.animate([{transform: "scale(1.2)"}, {transform: "scale(1)"}], {
        duration: 400,
      });
    } else {
      displayMsg("error", response.data.message, $(".msg-wrap"));
    }
  } catch (err) {
    console.log(`Error: ${err}`);
    displayMsg("error", err, $(".msg-wrap"));
  }
}

// views api
if (token) {
  fetch(`https://erudite-be.herokuapp.com/v1/topics/addview/${topicId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    redirect: "follow",
  })
    .then(res => res.json())
    .then(json => json);
}
