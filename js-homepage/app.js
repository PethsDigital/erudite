// short cut selectors function $ aand $$ are in ./nav-and-footer/nav.js

// grab all elements here with the shortcut selector from above comment
const selects = Array.from($$('.course-select.select'));
const courseCombo = $("#course-combo");
const checkCourse = $("#check-by-sub")
const courseDiv = $(".course");
const course = $('#course');
const closeBtn = Array.from($$('.modal .fa'));
const btn = $("#btn");

// functionalities
let jsonData;
let courseCodes;

// default aysyn function to be used later
async function fetchData(url) {
    try {
        const res = await fetch(url);
        const json = await res.json();
        return json;
    } catch (err) {
        // $(".oops").style.display = "flex";
        console.log(err);
    }
}

// `https://jambito-api.herokuapp.com/codes/subjects`

// dynamically load SUBJECT input option from the api
function selectSubjects(el, callback) {
    fetch('./json/subjects.json')
        .then(res => res.json())
        .then(data => {
            courseCodes = data;
            // for (key in data) {
            //     el.setAttribute("data-input-value", key);
            // }
            callback(el, Object.values(data));
        })
        .catch(err => console.log(err))
}
selects.forEach(select => selectSubjects(select, autocomplete));

// dynamically load COURSE input option from the api
fetch(`./json/results.json`)
    .then(res => res.json())
    .then(data => {
        autocomplete(course, Object.keys(data.results));
    })
    .catch(err => console.log(err));



// function to handle success or error msg
function displayMsg(type, resMsg, el) {
    let msg;
    msg = document.createElement('p');
    msg.className = 'msg';
    el.appendChild(msg);
    if (type === "success") {
        msg.innerHTML = `&check; &nbsp; ${resMsg}`;
    } else {
        msg.innerHTML = `&#9888; &nbsp;${resMsg}`;
        msg.style.background = "rgba(248, 20, 3, 0.658)"
    }
    setTimeout(() => {
        msg.style.display = "none";
    }, 4000);
}

// course result modal template
function displayCourseResult(sub) {
    courseDiv.innerHTML = "";
    $(".course-result-modal.modal").style.cssText = "display: block;";
    $(".overlay").style.display = "block";
    $(".course-result-modal.modal h2").textContent = 'Courses You Can Study';

    for (let key in sub) {
        courseDiv.innerHTML += `<h4 class="course-title">${key}</h4>`;
        sub[key].subjects.compulsory.forEach(code => {
            courseDiv.innerHTML += `<p class="course-child">${courseCodes[code]} (Compulsory)</p>`;
        });

        for (let place in sub[key].subjects.optional) {
            sub[key].subjects.optional[place].forEach(code => {
                courseDiv.innerHTML += `<p class="course-child">${courseCodes[code]} (Optional)</p>`;
            });
        }
    }
}

function displayCourseSubject(key, sub) {
    courseDiv.innerHTML = "";
    $(".course-result-modal.modal").style.cssText = "display: block;";
    $(".overlay").style.display = "block";
    $(".course-result-modal.modal h2").textContent = 'Jamb Combination For Your Course';
    courseDiv.innerHTML += `<h4 class="course-title">${course.value}</h4>`;
    sub.compulsory.forEach(code => {
        courseDiv.innerHTML += `<p class="course-child">${courseCodes[code]} (Compulsory)</p>`;
    });

    for (key in sub.optional) {
        sub.optional[key].forEach(code => {
            courseDiv.innerHTML += `<p class="course-child">${courseCodes[code]} (Optional)</p>`;
        });
    }
}

// function for courses subject combo
courseCombo.addEventListener("submit", e => {
    fetchData("./json/results.json")
        .then(data => {
            for (let key in data.results) {
                if (key == course.value) displayCourseSubject(key, data.results[key].subjects);
            }
        })
        .catch(err => {
            displayMsg("error", "Request failed please try again later :)", courseCombo);
            console.log(`Error: ${err}`);
        })
    e.preventDefault();
});

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}
// const map = { "first": "1", "second": "2" };
// console.log(getKeyByValue(map, "2"));

checkCourse.addEventListener("submit", e => {
    // disable btn
    btn.textContent = "loading...";
    btn.disabled = true;
    selects.forEach(sub => {
        for (let key in courseCodes) {
            if (sub.value === courseCodes[key]) {
                sub.setAttribute("data-input-value", getKeyByValue(courseCodes, sub.value));
            }
        }
    })
    let values = `1+${$("#sub2").getAttribute("data-input-value")}+${$("#sub3").getAttribute("data-input-value")}+${$("#sub4").getAttribute("data-input-value")}`
    let urls = `https://jambito-api.herokuapp.com/subjects/${values}`;
    fetchData(urls)
        .then(data => displayCourseResult(data.results))
        .catch(err => {
            displayMsg("error", "Request failed please try again later :)", checkCourse);
            console.log(`Error: ${err}`);
        })
        .finally(_ => {
            btn.textContent = "Register";
            btn.disabled = false;
        })
    e.preventDefault();
});

// close modals function
closeBtn.forEach(btn => btn.addEventListener("click", () => {
    $(".course-result-modal.modal").style.cssText = "display: none";
    $(".feedback-modal.modal").style.cssText = "display: none";
    $(".overlay").style.display = "none";
    course.value = '';
    subjects.forEach(sub => sub.value = '');
}))