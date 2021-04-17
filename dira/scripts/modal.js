const discussModal = $(".discuss-pop-up");
const discussModalbtn = $$(".create-category-btn");
// open modal
if (discussModalbtn) {
  discussModalbtn.forEach(el =>
    el.addEventListener("click", e => {
      discussModal.style.cssText = "display: block;";
      $(".overlay").style.display = "block";
    })
  );
}
// close modal section
Array.from($$(".close-msg")).forEach(btn => {
  btn.addEventListener("click", () => {
    discussModal.style.cssText = "display: none;";
    $(".overlay").style.display = "none";
    // discussMessageInput.value = "";
    // categoryInput.forEach(radio => (radio.checked = false));
  });
});

// navbar toggle function
let nav = $("nav");
let navLinks = $$("nav .fa.fa-times");
let bars = $(".fa.fa-bars");
let overlay = $(".overlay");

bars.addEventListener("click", _ => navFunc("block", "0"));
Array.from(navLinks).forEach(link =>
  link.addEventListener("click", _ => navFunc("none", "100%"))
);

function navFunc(type, val) {
  nav.style.cssText = `clip-path: inset(0 ${val} 0 0);`;
  overlay.style.display = type;
}

if ($("tbody")) {
  $("tbody").addEventListener("click", e => {
    if (e.target.className.includes("btn")) {
      e.target.parentElement
        .querySelector(".drop-down")
        .classList.toggle("drop-down-show");
    }
  });
}
$$(".profile").forEach(el =>
  el.addEventListener("click", e => {
    if (e.target.className.includes("profile-pic")) {
      el.querySelector(".drop-down").classList.toggle("drop-down-show");
    }
  })
);

// $(".left .profile img").src = userAuth.user.avatar;
