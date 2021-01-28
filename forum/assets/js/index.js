// get fetch request (function getData) declaration and short cut selectors function $ aand $$ are in ./nav-and-footer/nav.js

// template function to get topics depending on route

getData("./assets/json/alltitles.json").then(json => {
  let topicsWrap = $(".topics-wrap");
  json.forEach(el => {
    let templateTopicsCard = `<article class="topics-card">
            <div class="wrapper">
              <img
                src="../images/profile-pic.png"
                alt="avatar"
                class="topic-img"
              />
              <div class="text">
                <h2 class="tp-title">
                  <a href="./topic.html">
                    ${el.title}
                  </a>
                </h2>
                <a href="./topic.html" class="question">
                 ${el.description}
                </a>
              </div>
            </div>
            <div class="stat-info">
              <p class="cm-icon">${el.comments.length}</p>
              <hr />
              <p class="views"><i class="fa fa-eye"> &nbsp; </i>${el.views}</p>
              <hr />
              <p class="views"><i class="fa fa-heart"> &nbsp; </i>${el.likes.length}</p>
            </div>
            </article>`;
    if (json.length === 0) {
      $(".oops").style.display = "flex";
      $(".oops p").style.display = "No Topic has been created yet";
    }
    topicsWrap.innerHTML += templateTopicsCard;
  });
});

// get list of all categories
getData("./assets/json/allforums.json").then(json => {
  let parentEl = $("#categories");
  let categories = $(".category-wrap");
  json.forEach(el => {
    let templateTopicsCard = `<a href="./forum-topics.html?id=${94693}" class="ct-topic-child">
      ${el.name}
      <div class="num">${el.topics.length}</div>
    </a>`;
    let categoryRadio = ` <div class="form-control-group">
    <input required value="${el.forumId}" type="radio" name="category" id="${el.forumId}" />
    <label for="${el.forumId}">${el.name}</label>
  </div>`;
    categories.innerHTML += categoryRadio;
    parentEl.innerHTML += templateTopicsCard;
  });
});
