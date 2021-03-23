// short cut selectors function $ aand $$ are in ./nav-and-footer/nav.js
// function to handle success or error msg is in the nav.js file

// grab all elements here with the shortcut selector from above comment
const selects = Array.from($$(".course-select.select"));
const courseCombo = $("#course-combo");
const checkCourse = $("#check-by-sub");
const courseDiv = $(".course");
const course = $("#course");
const closeBtn = Array.from($$(".modal .fa"));
const btn = $$("form .check-btn");

// functionalities
let jsonData;
let courseCodes;

// default aysyn function to be used later
async function fetchData(url) {
  // disable btn
  btn.forEach(btn => (btn.disabled = true));
  $("#loader").style.cssText = "display: flex;";
  document.body.style.pointerEvents = "none";

  try {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  } finally {
    $("#loader").style.cssText = "display: none;";
    document.body.style.pointerEvents = "all";
    btn.forEach(btn => (btn.textContent = "Check"));
    btn.forEach(btn => (btn.disabled = false));
  }
}

// dynamically load SUBJECT input option from the api
function selectSubjects(el, callback) {
  fetch("./json/subjects.json")
    .then(res => res.json())
    .then(data => {
      Object.filter = (obj, predicate) =>
        Object.keys(obj)
          .filter(key => predicate(obj[key]))
          .reduce((res, key) => ((res[key] = obj[key]), res), {});
      let filteredData = Object.filter(data, el => el !== "Use of English");
      courseCodes = data;
      callback(el, Object.values(filteredData));
    })
    .catch(err => console.log(err));
}
selects.forEach(select => selectSubjects(select, autocomplete));

// dynamically load COURSE input option from the api
fetch(`https://jambito-api.herokuapp.com/`)
  .then(res => res.json())
  .then(data => {
    jsonData = data;
    console.log(data);
    autocomplete(course, Object.keys(data.results));
  })
  .catch(err => console.log(err));

// template to display courses from selected subjects (form1)
function displayCourseResult(sub) {
  courseDiv.innerHTML = "";
  $(".course-result-modal.modal").style.cssText = "display: block;";
  $(".overlay").style.display = "block";
  $(".course-result-modal.modal h2").textContent = "Courses You Can Study";
  if (sub.length > 0) {
    for (let el of sub) {
      courseDiv.innerHTML += `<p class="course-child">${el}</p>`;
    }
  } else {
    courseDiv.innerHTML += `<p style="text-align: center;">0 results found</p>`;
  }
  /* for (let key in sub) {
        courseDiv.innerHTML += `<h4 class="course-title">${key}</h4>`;
         sub[key].subjects.compulsory.forEach(code => {
            courseDiv.innerHTML += `<p class="course-child">${courseCodes[code]} (Compulsory)</p>`;
        });

         for (let place in sub[key].subjects.optional) {
            sub[key].subjects.optional[place].forEach(code => {
                courseDiv.innerHTML += `<p class="course-child">${courseCodes[code]} (Optional)</p>`;
            });
        } 
   } */
}

// template to display course subjects (form2)
function displayCourseSubject(key, sub) {
  courseDiv.innerHTML = "";
  $(".course-result-modal.modal").style.cssText = "display: block;";
  $(".overlay").style.display = "block";
  $(".course-result-modal.modal h2").textContent =
    "UTME Combination For Your Course";
  courseDiv.innerHTML += `<h4 class="course-title">${course.value}</h4>`;
  sub.compulsory.forEach(code => {
    courseDiv.innerHTML += `<p class="course-child">${code} (Compulsory)</p>`;
  });
  if (sub.length > 0) {
    for (key in sub.optional) {
      sub.optional[key].forEach(code => {
        courseDiv.innerHTML += `<p class="course-child">${code} (Optional)</p>`;
      });
    }
  } else {
    courseDiv.innerHTML += `<p style="text-align: center;">0 results found</p>`;
  }
}

// function snippets to be invoked later
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
function checkForDuplicates(array) {
  return new Set(array).size !== array.length;
}

// function for checking courses by subjects (form1)
checkCourse.addEventListener("submit", e => {
  $("#check-by-sub button").textContent = "loading...";

  //   set data attribute for each selected subject
  selects.forEach(sub => {
    for (let key in courseCodes) {
      if (sub.value === courseCodes[key]) {
        sub.setAttribute(
          "data-input-value",
          getKeyByValue(courseCodes, sub.value)
        );
      }
    }
  });

  //   a little form validation for valid input
  let values;
  let arrVal = selects.map(sub => sub.getAttribute("data-input-value"));
  let valPlaceholder = `1,${$("#sub2").getAttribute("data-input-value")},${$(
    "#sub3"
  ).getAttribute("data-input-value")},${$("#sub4").getAttribute(
    "data-input-value"
  )}`;

  if (checkForDuplicates(arrVal) || valPlaceholder.includes("null")) {
    displayMsg(
      "error",
      "Invalid subject combination, Pls try again :)",
      checkCourse
    );
    values;
  } else {
    values = valPlaceholder;
  }

  fetchData("./json/checker.json")
    .then(data => {
      let result = [];
      for (let i = 0; i < data.result.length; i++) {
        if (
          values.split(",").every(val => data.result[i].Subject.includes(val))
        ) {
          result.push(data.result[i].Course);
        }
      }
      setTimeout(() => displayCourseResult(result, 400));
    })
    .catch(err => {
      console.log(`Error: ${err}`);
    });
  e.preventDefault();
});

// function for courses subject combo (form2)
courseCombo.addEventListener("submit", e => {
  e.preventDefault();
  if (jsonData.results.hasOwnProperty(course.value)) {
    for (let key in jsonData.results) {
      if (`${key}` == course.value) {
        displayCourseSubject(key, jsonData.results[key].subjects);
        courseDiv.innerHTML += `<h4 class="course-title">List Of Schools:</h4>`;
        jsonData.results[key].schools.forEach(sch => {
          courseDiv.innerHTML += `<span>${sch}</span>&nbsp; | &nbsp;`;
        });
      }
    }
  } else if (!jsonData.results.hasOwnProperty(course.value)) {
    displayMsg("error", "Course Not Found...", courseCombo);
  }
});

// close modals function
closeBtn.forEach(btn =>
  btn.addEventListener("click", () => {
    $(".course-result-modal.modal").style.cssText = "display: none";
    // $(".feedback-modal.modal").style.cssText = "display: none";
    $(".overlay").style.display = "none";
    course.value = "";
    selects.forEach(sub => (sub.value = ""));
  })
);
