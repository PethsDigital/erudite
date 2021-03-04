// get fetch request (function getData) declaration and short cut selectors function $ aand $$ are in ./nav-and-footer/nav.js

// template function to get topics depending on route
let topicId = window.location.href.split("?").pop().split("=")[1];

let response;
getData(`https://erudite-be.herokuapp.com/v1/topics/${topicId}`)
  .then(json => {
    $(".breadcrumb-link.topic").innerHTML += json.title;
    $(".breadcrumb-link.forum-category").innerHTML = json.forumName;
    $(".breadcrumb-link.forum-category").setAttribute(
      "href",
      `./forum-topics.html?id=${json.forumId}`
    );
    response = json;
    return getData(`https://erudite-be.herokuapp.com/v1/users/${json.userId}`);
  })
  .then(user => {
    let parentEl = $(".description");
    let topicDescription = `<article class="main-question thread-wrap">
            <img src="${user.avatar}" alt="avatar" />
            <div class="text">
              <div class="info">
                <b class="name">${user.username}</b>
                <p class="time-posted">${displayTime(
                  response.createdAt
                )} ago</p>
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
    $("#com-num").innerHTML = `${response.comments.length} Comments`;
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
      let allComments = "";
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
                <button type="button" class="reply">Reply</button>
                <p class="time-posted">${displayTime(
                  response[i].createdAt
                )} ago</p>
              </div>
            
            </div>
            </article>`;
            allComments += commentTemplate;
            commentWrap.innerHTML += allComments;
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
