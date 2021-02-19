// get fetch request (function getData) declaration and short cut selectors function $ aand $$ are in ./nav-and-footer/nav.js

// template function to get topics depending on route
let topicId = window.location.href.split("?").pop().split("=")[1];
getData(`https://erudite-be.herokuapp.com/v1/topics/${topicId}`).then(json => {
  let parentEl = $(".description");
  $(".breadcrumb-link.topic").innerHTML += json.title;
  $(".breadcrumb-link.forum-category").innerHTML = json.forumName;
  $(".breadcrumb-link.forum-category").setAttribute(
    "href",
    `./forum-topics.html?id=${json.forumId}`
  );
  let topicDescription = `<article class="main-question thread-wrap">
            <img src="${
              json.user.avatar
                ? json.user.avatar
                : "https://res.cloudinary.com/tomiwadev/image/upload/v1612047488/erudite/Profile_pic_1_xlepwh.png"
            }" alt="avatar" />
            <div class="text">
              <div class="info">
                <b class="name">${json.user.name}</b>
                <p class="time-posted">${displayTime(json.createdAt)} ago</p>
              </div>
              <p class="text-msg">
               ${json.description}
              </p>
            </div>
          </article>`;
  parentEl.innerHTML += topicDescription;
  // get comments
  $("#com-num").innerHTML = `${json.comments.length} Comments`;
});

function getTime(createdAt) {
  let d = Math.abs(new Date() - new Date(createdAt)) / 1000; // delta
  let r = {}; // result
  let s = {
    day: 86400, // feel free to add your own row
    hr: 3600,
    min: 60,
  };

  Object.keys(s).forEach(function (key) {
    r[key] = Math.floor(d / s[key]);
    d -= r[key] * s[key];
  });
  return r;
}

function displayTime(createdAt) {
  let result = getTime(createdAt);
  let day = result.day < 1 ? "" : result.day + " day(s)";
  let hr = result.hr < 1 ? "" : result.hr + " hr";
  let min = result.min + " min";
  return result.day > 0 ? `${day}` : `${day} ${hr} ${min}`;
}

getData(
  `https://erudite-be.herokuapp.com/v1/comments/resource/${topicId}`
).then(json => {
  let commentWrap = $(".comments-wrapper");
  let allComments = "";
  json.forEach(el => {
    console.log(userAuth.user.avatar);
    let commentTemplate = `<article id="${
      el._id
    }" class="first-level-comment thread-wrap">
      <img src="${
        token && userAuth.user.avatar
          ? userAuth.user.avatar
          : "https://res.cloudinary.com/tomiwadev/image/upload/v1612047488/erudite/Profile_pic_1_xlepwh.png"
      }" alt="avatar" />
      <div class="text">
        <div class="info">
          <b class="name">${el.user.name}</b>
        </div>
        <p class="text-msg">
         ${el.comment}
        </p>
        <br />
        <div class="info">
        <input type="checkbox" onChange="likeFunc(this)" value="None" name="like-btn" id="${
          el._id + "1"
        }"/>
        <label for="${el._id + "1"}" type="button" class="like ${
      el.likes.includes(userAuth.user.id) ? "liked" : ""
    }"><i class="fa fa-heart"></i> <span class="count"> ${
      el.likes.length
    }</span> </label>
          <button type="button" class="reply">Reply</button>
          <p class="time-posted">${displayTime(el.createdAt)} ago</p>
        </div>
      
      </div>
      </article>`;
    allComments += commentTemplate;
  });
  commentWrap.innerHTML += allComments;
});

function getLikes(url, likeEl) {
  return fetch(url)
    .then(res => res.json())
    .then(json => {
      json.data.forEach(el => {
        likeEl.innerHTML = el.likes.length;
      });
    });
}

function likeFunc(e) {
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
      requestBody,
      commentId
    );

    setTimeout(
      () => e.parentElement.children[1].classList.remove("liked"),
      1000
    );
  } else {
    likeUnlike(
      e.parentElement.children[1],
      `https://erudite-be.herokuapp.com/v1/comments/like/${commentId}/`,
      requestBody,
      commentId
    );

    setTimeout(() => e.parentElement.children[1].classList.add("liked"), 1000);
  }
}

async function likeUnlike(el, url, requestBody, commentId) {
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
