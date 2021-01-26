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
