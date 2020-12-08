// shortcut querySelector
const $ = el => document.querySelector(el);
const $$ = el => document.querySelectorAll(el);

// // navbar toggle function
// let navbar = $(".nav-menu");
// let navLink = $$(".navbar a");
// let menuBtn = $(".navbar i");

// const toggleBtn = () => {
//     if (menuBtn.className.includes('fa-bars')) {
//         menuBtn.classList.add("fa-times");
//         menuBtn.classList.remove("fa-bars");
//         navbar.style.cssText = 'clip-path: inset(0 0 0 0);';
//     } else if (menuBtn.className.includes('fa-times')) {
//         navbar.style.cssText = "clip-path: inset(0 0 100% 0);"
//         menuBtn.classList.remove("fa-times");
//         menuBtn.classList.add("fa-bars");
//     }
// }
let navbar = $(".nav2");
let navLink = $$(".nav2 a");
let openToggle = $(".fa.fa-bars");

openToggle.addEventListener(
    "click",
    (_) => (navbar.style.cssText = "clip-path: circle(100%);")
);
Array.from(navLink).forEach((link) =>
    link.addEventListener(
        "click",
        (_) => (navbar.style.cssText = " clip-path: circle(0% at 100% 0);")
    )
);

// menuBtn.addEventListener('click', toggleBtn);
// Array.from(navLink).forEach(link => link.addEventListener('click', toggleBtn));

