// get fetch request (function getData) declaration and short cut selectors function $ aand $$ are in ./nav-and-footer/nav.js

// template function to get topics depending on route
$(".title-n-nav .tag").innerHTML = `Erudite Forum`;

getData("https://erudite-be.herokuapp.com/v1/topics/").then(json => {
  let topicsWrap = $(".topics-wrap");
  let lastTenComments = json.slice(-10);

  lastTenComments.reverse().forEach(el => {
    let templateTopicsCard = `<article class="topics-card">
              <div class="wrapper">
                <img
                  src="https://res.cloudinary.com/tomiwadev/image/upload/v1612047488/erudite/Profile_pic_1_xlepwh.png"
                  alt="avatar"
                  class="topic-img"
                />
                <div class="text">
                  <h2 class="tp-title">
                    <a href="./topic.html?id=${el._id}">
                      ${el.title}
                    </a>
                  </h2>
                  <a href="./topic.html?id=${el._id}" class="question">
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
getData("https://erudite-be.herokuapp.com/v1/forums/").then(json => {
  let parentEl = $("#categories");
  let categories = $(".category-wrap");
  json.forEach(el => {
    let templateTopicsCard = `<a href="./forum-topics.html?id=${el._id}" class="ct-topic-child">
      ${el.name}
      <div class="num">${el.topics.length}</div>
    </a>`;
    let categoryRadio = ` <div class="form-control-group">
    <input required value="${el._id}" type="radio" name="category" id="${el._id}" />
    <label for="${el._id}">${el.name}</label>
  </div>`;
    categories.innerHTML += categoryRadio;
    parentEl.innerHTML += templateTopicsCard;
    console.log(el._id, el.name);
  });
});
