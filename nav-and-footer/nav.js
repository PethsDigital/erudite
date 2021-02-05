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
  el.appendChild(msg);
  if (type === "success") {
    msg.innerHTML = `&check; &nbsp; ${resMsg}`;
  } else {
    msg.innerHTML = `&#9888; &nbsp;${resMsg}`;
    msg.style.background = "rgba(248, 20, 3, 0.658)";
  }
  setTimeout(() => {
    msg.style.display = "none";
  }, 4000);
}

Array.from($$(".pwd-wrap")).forEach(input => {
  input.addEventListener("click", e => {
    if (e.target.classList.contains("fas")) {
      e.target.classList.toggle("fa-eye-slash");
      e.target.classList.toggle("fa-eye");
      console.log(e.target);
      e.target.classList.contains("fa-eye-slash")
        ? changeInputType(
            e.target.parentElement.parentElement.firstElementChild,
            "text"
          )
        : changeInputType(
            e.target.parentElement.parentElement.firstElementChild,
            "password"
          );
    }
  });
});

function changeInputType(oldObject, oType) {
  var newObject = document.createElement("input");
  newObject.type = oType;
  if (oldObject.value) newObject.value = oldObject.value;
  if (oldObject.minLength) newObject.minLength = oldObject.minLength;
  if (oldObject.required) newObject.required = oldObject.required;
  if (oldObject.id) newObject.id = oldObject.id;
  if (oldObject.placeholder) newObject.placeholder = oldObject.placeholder;
  if (oldObject.autocomplete) newObject.autocomplete = oldObject.autocomplete;
  oldObject.parentNode.replaceChild(newObject, oldObject);
  return newObject;
}

// for start a discussion modal
const discussModal = $(".discuss-pop-up");
const discussModalbtn = $(".st-discuss");
const categoryInput = Array.from($$("input[type='radio']"));
const discussMessageInput = $(".discuss-pop-up textarea");
const firstLevelReply = $("#first-level");
const replyBtn = Array.from($$(".reply"));
const comments = $(".comments");
const replyCommentWrap = $("#reply-comment-wrap");
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
let token = userAuth.token;
let avatars = [
  "https://res.cloudinary.com/tomiwadev/image/upload/v1612046507/erudite/Ellipse_68_vgi4ez.png",
  "https://res.cloudinary.com/tomiwadev/image/upload/v1612046507/erudite/Avatar_ng07if.png",
  "https://res.cloudinary.com/tomiwadev/image/upload/v1612046507/erudite/Ellipse_60_zhre1e.png",
  "https://res.cloudinary.com/tomiwadev/image/upload/v1612046507/erudite/Avatar_1_bu2acu.png",
  "https://res.cloudinary.com/tomiwadev/image/upload/v1612046507/erudite/Ellipse_59_jpwyp0.png",
  "https://res.cloudinary.com/tomiwadev/image/upload/v1612046507/erudite/Ellipse_69_zxhsxx.png",
  "https://res.cloudinary.com/tomiwadev/image/upload/v1612046506/erudite/Ellipse_66_bo7gaq.png",
  "https://res.cloudinary.com/tomiwadev/image/upload/v1612046506/erudite/Ellipse_63_gejtgh.png",
  "https://res.cloudinary.com/tomiwadev/image/upload/v1612046506/erudite/Ellipse_62_csuyyx.png",
  "https://res.cloudinary.com/tomiwadev/image/upload/v1612046506/erudite/Ellipse_67_r59opf.png",
  "https://res.cloudinary.com/tomiwadev/image/upload/v1612046506/erudite/Ellipse_64_ggrymu.png",
  "https://res.cloudinary.com/tomiwadev/image/upload/v1612046506/erudite/Ellipse_65_gsipfj.png",
];
function getData(url) {
  return fetch(url)
    .then(res => res.json())
    .then(json => {
      $(".ball-loader").style.display = "none";
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
      $(".ball-loader").style.display = "none";
      $(".oops").style.display = "flex";
      console.log(err);
    })
    .finally(_ => {
      document.body.style.pointerEvents = "all";
    });
}
