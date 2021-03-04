const topicBtn = $("#topic-btn span");
// const commentBtn = $("#comment-btn");
// commentBtn.addEventListener("click", e => {
//   if (!e.target.className.includes("active")) {
//     $(".topics").style.display = "none";
//     $(".user-comments").style.display = "block";
//     e.target.classList.toggle("active");
//     topicBtn.classList.toggle("active");
//   } else {
//     return;
//   }
// });
// topicBtn.addEventListener("click", e => {
//   if (!e.target.className.includes("active")) {
//     $(".topics").style.display = "block";
//     $(".user-comments").style.display = "none";
//     e.target.classList.toggle("active");
//     commentBtn.classList.toggle("active");
//   } else {
//     return;
//   }
// });
window.onload = function (el) {
  getData(`https://erudite-be.herokuapp.com/v1/users/${userAuth.user.id}`).then(
    user => {
      $(".text h2").innerHTML = user.name;
      $(".text p").innerHTML = `@${user.username}`;
      $(".left img").src = user.avatar;
    }
  );
};

$(".topics").innerHTML = `<div class="pre-loader">
<div class="wrap">
  <img
    src="https://res.cloudinary.com/tomiwadev/image/upload/v1613560587/erudite/logo-blue_zro7g4.png"
    alt="logo"
  />
  <div class="circle"></div>
</div>
</div>`;
fetch(
  `https://erudite-be.herokuapp.com/v1/topics/user/${
    JSON.parse(localStorage.getItem("erudite_auth")).user.id
  }`
)
  .then(res => res.json())
  .then(json => {
    $(".topics").innerHTML = "";
    topicBtn.innerHTML = json.data.length;
    json.data.forEach(el => {
      $(
        ".topics"
      ).innerHTML += ` <a href="../forum/topic.html?id=${el._id}" class="topic">
      <h2 class="title">${el.title}</h2>
      <p class="description">
        ${el.description}
      </p>
      <div class="reactions">
        <span>
          <img src="../images/msg-sq.svg" alt="comment icon" />&nbsp; ${el.comments.length}
        </span>
        <span><i class="fa fa-eye"></i>&nbsp; ${el.views}</span>
      </div>
    </a>`;
    });
    if (json.data.length === 0) {
      $(".topics").innerHTML = `<div class="oops">
      <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" class="heart"
      width="100"
      height="100" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M23.5,27.5H6.5l-1-15.19a.76.76,0,0,1,.77-.81H10a1.11,1.11,0,0,1,.89.44l1.22,1.56H23.5v2"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M26.3,20.7l.84-3.2H9.25L6.5,27.5H23.41a1.42,1.42,0,0,0,1.37-1.06l.76-2.88"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M16.5,24.5h0a1.42,1.42,0,0,1,2,0h0"/><line x1="13.5" x2="14.5" y1="21.5" y2="21.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><line x1="20.5" x2="21.5" y1="21.5" y2="21.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M20.62,3.61C18.25,4,16.5,5.37,16.5,7a2.57,2.57,0,0,0,.7,1.7l-.7,2.8,2.86-1.43A8.12,8.12,0,0,0,22,10.5c3,0,5.5-1.57,5.5-3.5,0-1.6-1.69-2.95-4-3.37"/><line x1="21.25" x2="22.75" y1="6.25" y2="7.75" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><line x1="22.75" x2="21.25" y1="6.25" y2="7.75" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <br />
      <h1>Oops!</h1>
      <p>You have not created any topic yet</p>
      <p><a href="../forum/index.html">Go here</a>, Click on "Start-discussion" to create a new topic for discussion</p>
      </div>`;
    }
  })
  .catch(err => {
    $(".topics").innerHTML = `<div class="oops">
      <svg
        width="70"
        height="70"
        viewBox="0 0 20 20"
        fill="none"
        fill-rule="evenodd"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        >
        <path
        d="M19 4.8a16 16 0 00-2-1.2m-3.3-1.2A16 16 0 001.1 4.7M16.7 8a12 12 0 00-2.8-1.4M10 6a12 12 0 00-6.7 2M12.3 14.7a4 4 0 00-4.5 0M14.5 11.4A8 8 0 0010 10M3 16L18 2M10 18h0"
        ></path>
        </svg>
        <br />
        <h1>Oops!</h1>
        <p>An error ocurred, you might want to check your network connection</p>

    </div>`;
    console.log(err);
  });

// fetch(
//   `https://erudite-be.herokuapp.com/v1/comments/user/${
//     JSON.parse(localStorage.getItem("erudite_auth")).user.id
//   }`
// )
//   .then(res => res.json())
//   .then(json => {
//     console.log(json);
//     // json.data.forEach(el => {
//     //   $(
//     //     ".user-comments"
//     //   ).innerHTML += ` <a href="../forum/topic.html?id=${el._id}" class="topic">
//     //   <h2 class="title">${el.title}</h2>
//     //   <p class="description">
//     //     ${el.description}
//     //   </p>
//     //   <div class="reactions">
//     //     <span>
//     //       <img src="../images/msg-sq.svg" alt="comment icon" />&nbsp; ${el.comments.length}
//     //     </span>
//     //     <span><i class="fa fa-eye"></i>&nbsp; ${el.views}</span>
//     //   </div>
//     //   </div>
//     //   <div class="comment-itself left">
//     //     <img
//     //       src="https://res.cloudinary.com/tomiwadev/image/upload/v1612047488/erudite/Profile_pic_1_xlepwh.png"
//     //       alt=""
//     //     />
//     //     <p>
//     //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
//     //       tempore incidunt quam, animi aut nulla eos.
//     //     </p>
//     //   </div>
//     // </a>`;
//     // });
//   });
