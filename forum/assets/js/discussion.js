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
                <p class="time-posted">3 hours ago</p>
              </div>
              <p class="text-msg">
               ${json.description}
              </p>
            </div>
          </article>`;
  parentEl.innerHTML += topicDescription;
  console.log(json);
  // get comments
  $("#com-num").innerHTML = `${json.comments.length} Comments`;
});

function commentText(topicId) {
  return getData(
    `https://erudite-be.herokuapp.com/v1/comments/resource/${topicId}`
  ).then(json => {
    let commentWrap = $(".comments-wrapper");
    console.log(json);
    let allComments = "";
    json.forEach(el => {
      let commentTemplate = `<article id="${el._id}" class="first-level-comment thread-wrap">
      <img src="../images/Ellipse 27 (1).png" alt="avatar" />
      <div class="text">
        <div class="info">
          <b class="name">${el.user.name}</b>
        </div>
        <p class="text-msg">
         ${el.comment}
        </p>
        <br />
        <div class="info">
        <button role="checkbox" type="button" class="like"><i class="fa fa-heart"></i> <span class="count">${el.likes.length}</span> </button>
          <button type="button" class="reply">Reply</button>
          <p class="time-posted">3 hrs ago</p>
        </div>
      
      </div>
      </article>`;
      allComments += commentTemplate;
      // getLikes(el._id);
    });
    commentWrap.innerHTML += allComments;
  });
}
// commentText(topicId);
// let isLiked = false;
// comments.addEventListener("click", e => {
//   if (e.target.className.includes("like")) {
//     e.target.classList.toggle("liked");
//     e.target.animate([{transform: "scale(1.2)"}, {transform: "scale(1)"}], {
//       duration: 400,
//     });
//     if (isLiked) {
//       likes.push(userAuth.userId);
//       e.target.querySelector(".count").innerHTML--;
//       isLiked = false;
//     } else {
//       likes.pop();
//       e.target.querySelector(".count").innerHTML++;
//       isLiked = true;
//     }
//     console.log(likes, isLiked);
//   }
// });
let likes;
function getLikes(id) {
  return fetch(`https://erudite-be.herokuapp.com/v1/comment/like/${id}/`)
    .then(res => res.json())
    .then(json => {
      likes = json.length;
    });
}

// Array($$(".thread-wrap")).forEach(comment => {
//   comment.addEventListener("click", e => {
//     if (e.target.className === "like") {
//       console.log(comment.id);
//       // let requestBody = {
//       //   method: "PATCH",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //     Authorization: `bearer ${token}`,
//       //   },
//       //   body: JSON.stringify({
//       //     userId: JSON.parse(localStorage.getItem("erudite_auth")).user.id,
//       //   }),
//       //   redirect: "follow",
//       // };
//       // fetch(`https://erudite-be.herokuapp.com/v1/comment/like/${comment.id}/`, requestBody)
//       // .then(res => res.json())
//       // .then(response => {
//       //   console.log(response);
//       //   if (response.success == true) {
//       //     displayMsg("success", response.message, $(".msg-wrap"));
//       //     getLikes(comment.id)
//       //   } else {
//       //     displayMsg("error", response.message, $(".msg-wrap"));
//       //   }
//       // })
//       // .catch(err => {
//       //   console.log(`Error: ${err}`);
//       //   displayMsg("error", err, $(".msg-wrap"));
//       // })
//     }
//   });
// });
