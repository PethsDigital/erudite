// shortcut querySelector
const $ = el => document.querySelector(el);
const $$ = el => document.querySelectorAll(el);

// navbar toggle function
let navbar = $(".nav-menu");
let navLink = $$(".navbar a");
let menuBtn = $(".navbar i");

const toggleBtn = () => {
    if (menuBtn.className.includes('fa-bars')) {
        menuBtn.classList.add("fa-times");
        menuBtn.classList.remove("fa-bars");
        navbar.style.cssText = 'clip-path: inset(0 0 0 0);';
    } else if (menuBtn.className.includes('fa-times')) {
        navbar.style.cssText = "clip-path: inset(0 0 100% 0);"
        menuBtn.classList.remove("fa-times");
        menuBtn.classList.add("fa-bars");
    }
}

menuBtn.addEventListener('click', toggleBtn);
// Array.from(navLink).forEach(link => link.addEventListener('click', toggleBtn));

