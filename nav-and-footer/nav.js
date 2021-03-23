// shortcut querySelector
const $ = el => document.querySelector(el);
const $$ = el => document.querySelectorAll(el);

let navbar = $(".nav2");
let navLink = $$(".nav2 a");
let openToggle = $(".fa.fa-bars");

openToggle.addEventListener(
  "click",
  _ => (navbar.style.cssText = "clip-path: circle(100%);")
);
Array.from(navLink).forEach(link =>
  link.addEventListener(
    "click",
    _ => (navbar.style.cssText = " clip-path: circle(0% at 100% 0);")
  )
);

// menuBtn.addEventListener('click', toggleBtn);
// Array.from(navLink).forEach(link => link.addEventListener('click', toggleBtn));

// a form of global function used for displaying messages
function displayMsg(type, resMsg, el) {
  let msg;
  msg = document.createElement("p");
  msg.className = "msg";
  document.body.insertBefore(msg, document.body.firstElementChild);
  if (type === "success") {
    msg.innerHTML = `&check; &nbsp; ${resMsg}`;
  } else {
    msg.innerHTML = `&#9888; &nbsp;${resMsg}`;
    msg.style.background = "rgb(248, 20, 3)";
  }
  setTimeout(() => {
    msg.style.display = "none";
  }, 4500);
}

Array.from($$(".pwd-wrap .view-pwd")).forEach(input => {
  input.addEventListener(
    "click",
    e => {
      e.target.classList.toggle("fa-eye-slash");
      e.target.classList.toggle("fa-eye");
      e.target.classList.contains("fa-eye-slash")
        ? e.target.parentElement.firstElementChild.setAttribute("type", "text")
        : e.target.parentElement.firstElementChild.setAttribute(
            "type",
            "password"
          );
    },
    false
  );
});

function getTime(createdAt) {
  let d = Math.abs(new Date() - new Date(createdAt)) / 1000; // delta
  let r = {}; // result
  let s = {
    day: 86400,
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

// for start a discussion modal
const discussModal = $(".discuss-pop-up");
const discussModalbtn = $(".st-discuss");
const categoryInput = Array.from($$("input[type='radio']"));
const discussMessageInput = $(".discuss-pop-up textarea");
const firstLevelReply = $("#first-level");
const replyBtn = Array.from($$(".reply"));
const comments = $(".comments");
const replyCommentWrap = $("#reply-form-node");

if (discussModalbtn) {
  discussModalbtn.addEventListener("click", e => {
    discussModal.style.cssText = "display: block;";
    $(".overlay").style.display = "block";
  });
}

// close modal section
Array.from($$(".close-msg")).forEach(btn => {
  btn.addEventListener("click", () => {
    discussModal.style.cssText = "display: none;";
    $(".overlay").style.display = "none";
    discussMessageInput.value = "";
    categoryInput.forEach(radio => (radio.checked = false));
  });
});

function getData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        return resolve(json.data);
      })
      .catch(err => {
        $("main").style.display = "none";
        $(".oops").style.display = "flex";
        $(".pre-loader").style.display = "none";

        console.log(err.message);
      });
  });
}
// search topics and display results
if ($("#search-title")) {
  $("#search-title").addEventListener("submit", e => {
    e.preventDefault();
    $(".main-discussion.right").innerHTML = `<div class="pre-loader">
    <div class="wrap">
      <img
        src="https://res.cloudinary.com/tomiwadev/image/upload/v1613560587/erudite/logo-blue_zro7g4.png"
        alt="logo"
      />
      <div class="circle"></div>
    </div>
    </div>`;
    let responseData;
    let inputVal = $("#search-title input").value;
    getData(`https://erudite-be.herokuapp.com/v1/topics/?search=${inputVal}`)
      .then(json => {
        responseData = json;
        if (json.length <= 0) {
          return ($(".main-discussion.right").innerHTML = `<div class="oops">
        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" class="heart"
        width="100"
        height="100" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M23.5,27.5H6.5l-1-15.19a.76.76,0,0,1,.77-.81H10a1.11,1.11,0,0,1,.89.44l1.22,1.56H23.5v2"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M26.3,20.7l.84-3.2H9.25L6.5,27.5H23.41a1.42,1.42,0,0,0,1.37-1.06l.76-2.88"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M16.5,24.5h0a1.42,1.42,0,0,1,2,0h0"/><line x1="13.5" x2="14.5" y1="21.5" y2="21.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><line x1="20.5" x2="21.5" y1="21.5" y2="21.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M20.62,3.61C18.25,4,16.5,5.37,16.5,7a2.57,2.57,0,0,0,.7,1.7l-.7,2.8,2.86-1.43A8.12,8.12,0,0,0,22,10.5c3,0,5.5-1.57,5.5-3.5,0-1.6-1.69-2.95-4-3.37"/><line x1="21.25" x2="22.75" y1="6.25" y2="7.75" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><line x1="22.75" x2="21.25" y1="6.25" y2="7.75" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <br />
        <h1>Oops!</h1>
        <p>Topic not found</p>
        <p>Click on "Start-discussion" to create a new topic for discussion</p>
        </div>`);
        } else if (json.length > 0) {
          return json.map(el => el.userId);
        }
      })
      .then(arr => {
        return fetchUsersData(arr).then(result => {
          $("#search-title input").value = "";
          $(
            ".main-discussion.right"
          ).innerHTML = `<h1 style="text-align: center; color: var(--primary-color); font-weight: 500;">Search Results For "${inputVal}"  (${result.length} results)</h1>`;
          result.forEach((user, i) => {
            if (user.success) {
              $(
                ".main-discussion.right"
              ).innerHTML += ` <a href="./topic.html?id=${
                responseData[i]._id
              }" class="topics-card search-results">
                  <div class="wrapper">
                    <div class="author">
                      <img src="${user.data.avatar}" alt="author pic" />
                      <h4>${user.data.username}</h4>
                      &nbsp; &nbsp;
                      <p class="time-posted">${displayTime(
                        responseData[i].createdAt
                      )} Ago</p>
                    </div>
                    <div class="text">
                      <h2 class="tp-title">
                        ${responseData[i].title}
                      </h2>
                      <p class="question">
                        ${responseData[i].description}
                      </p>
                    </div>
                    <br />
                    <div class="bottom">
                      <div class="forum-name">${responseData[i].forumName}</div>
                      <div class="stats">
                        <p class="stat">
                          <img
                            src="../images/msg-sq.svg"
                            alt="forum avatar"
                            class="comment-icon"
                          />
                          ${responseData[i].comments.length}
                        </p>
                        &nbsp; &nbsp; &nbsp;
                        <p class="stat"><i class="fa fa-eye"> &nbsp; </i>${
                          responseData[i].views
                        }</p>
                      </div>
                    </div>
                  </div>
                </a>`;
            }
          });
        });
      });
  });
}
// to store userVerification
let userAuth = JSON.parse(localStorage.getItem("erudite_auth"));
let token = userAuth
  ? JSON.parse(localStorage.getItem("erudite_auth")).token
  : "";

if ($("#sign-out")) {
  if (userAuth) {
    $(".left #signup").style.display = "none";
    $(".left .profile img").addEventListener("click", e =>
      $(".left .drop-down").classList.toggle("drop-down-show")
    );
    $(".left .profile img").src = userAuth.user.avatar;
  } else {
    $(".left .profile").style.display = "none";
    $(".left #signup").style.display = "block";
  }
  $("#sign-out").addEventListener("click", e => {
    localStorage.clear();
    userAuth = "";
    displayMsg("success", "Logout successful");
    setTimeout(() => (window.location.pathname = "/"), 1000);
  });
}
// fetch users data from array of users id
function fetchUsersData(userArr) {
  const promises = userArr.map((el, i) => {
    return fetch(`https://erudite-be.herokuapp.com/v1/users/${el}`)
      .then(res => res.json())
      .then(json => {
        if (i >= userArr.length - 1) {
          document.body.style.pointerEvents = "all";
          $(".pre-loader").style.display = "none";
        }
        return json;
      });
  });

  return Promise.all(promises);
}
