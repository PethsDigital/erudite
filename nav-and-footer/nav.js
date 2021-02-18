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

// for start a discussion modal
const discussModal = $(".discuss-pop-up");
const discussModalbtn = $(".st-discuss");
const categoryInput = Array.from($$("input[type='radio']"));
const discussMessageInput = $(".discuss-pop-up textarea");
const firstLevelReply = $("#first-level");
const replyBtn = Array.from($$(".reply"));
const comments = $(".comments");
const replyCommentWrap = $("#reply-form-node");
let replyClone;

discussModalbtn.addEventListener("click", e => {
  discussModal.style.cssText = "display: block;";
  $(".overlay").style.display = "block";
});

// close modal section
Array.from($$(".close-msg")).forEach(btn => {
  btn.addEventListener("click", () => {
    discussModal.style.cssText = "display: none;";
    $(".overlay").style.display = "none";
    discussMessageInput.value = "";
    categoryInput.forEach(radio => (radio.checked = false));
  });
});

// to store userVerification
let userAuth = JSON.parse(localStorage.getItem("erudite_auth"));
let token = JSON.parse(localStorage.getItem("erudite_auth")).token;

function getData(url) {
  return fetch(url)
    .then(res => res.json())
    .then(json => {
      $(".pre-loader").style.display = "none";
      return json.data;
    })
    .catch(err => {
      if (!token) {
        displayMsg(
          "error",
          `pls <a href="../registration/login.html" target="_blank" rel="noopener noreferrer">Login</a>
          or <a href="../registration/signup.html" target="_blank" rel="noopener noreferrer">Sign-up</a> to enable this action`,
          $("form.discuss-pop-up")
        );
        setTimeout(() => {
          window.location.replace("../registration/signup.html");
        }, 1000);
      }
      $("main").style.display = "none";
      $(".pre-loader").style.display = "none";
      $(".oops").style.display = "flex";
      console.log(err);
    })
    .finally(_ => {
      document.body.style.pointerEvents = "all";
    });
}
