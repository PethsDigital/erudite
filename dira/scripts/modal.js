const modal = $$(".modal");
const discussModal = $("#create-category");
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
    modal.forEach(el => (el.style.cssText = "display: none;"));
    $(".overlay").style.display = "none";
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

const noContent = (el, msg) => {
  el.innerHTML = `<div class="oops">
  <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" class="heart"
  width="100"
  height="100" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M23.5,27.5H6.5l-1-15.19a.76.76,0,0,1,.77-.81H10a1.11,1.11,0,0,1,.89.44l1.22,1.56H23.5v2"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M26.3,20.7l.84-3.2H9.25L6.5,27.5H23.41a1.42,1.42,0,0,0,1.37-1.06l.76-2.88"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M16.5,24.5h0a1.42,1.42,0,0,1,2,0h0"/><line x1="13.5" x2="14.5" y1="21.5" y2="21.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><line x1="20.5" x2="21.5" y1="21.5" y2="21.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M20.62,3.61C18.25,4,16.5,5.37,16.5,7a2.57,2.57,0,0,0,.7,1.7l-.7,2.8,2.86-1.43A8.12,8.12,0,0,0,22,10.5c3,0,5.5-1.57,5.5-3.5,0-1.6-1.69-2.95-4-3.37"/><line x1="21.25" x2="22.75" y1="6.25" y2="7.75" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><line x1="22.75" x2="21.25" y1="6.25" y2="7.75" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <br />
  <h1>Oops!</h1>
  <p>${msg}</p>
  <p><a href="../forum/index.html">Go here</a>, Click on "Start-discussion" to create a new topic for discussion</p>
  </div>`;
};

// $(".left .profile img").src = userAuth.user.avatar;
