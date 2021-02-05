// get fetch request (function getData) declaration and short cut selectors function $ aand $$ are in ./nav-and-footer/nav.js

// template for unanswered topics
getData("https://erudite-be.herokuapp.com/v1/topics/").then(json => {
  let parentEl = $("#unanswered");
  let data = json.filter(el => el.comments.length == 0);
  if (data.length == 0) {
    parentEl.innerHTML += `<h1 class="un-text"  style="color: #222; text-align: center; margin: 2rem auto;">
      0 topics...
    </h1>`;
  }
  console.log(data);
  data.reverse().forEach(el => {
    let templateTopicsCard = ` <article class="un-topic-child">
            <div class="info">
              <img
                src="../images/Profile-pic.png"
                alt="avatar"
                class="avatar"
              />
              <b class="name">${el.user.name}</b>
            </div>
            <a href="./topic.html?id=${el._id}">
             ${el.description}</a
            >
            <p class="stat">
              <img
                src="../images/msg-sq.svg"
                alt="forum avatar"
                class="comment-icon"
              />
              &nbsp; ${el.comments.length} comments
            </p>
          </article>`;
    parentEl.innerHTML += templateTopicsCard;
  });
});

// template for popular topics
getData("https://erudite-be.herokuapp.com/v1/topics/").then(json => {
  let parentEl = $(".popular.topics");
  let data = json.filter(el => el.comments.length >= 50);
  data.forEach(el => {
    let templateTopicsCard = `<article class="topic-child">
      <a href="#"> ${el.title}</a>
      <p class="stat">
        <img
          src="../images/msg-sq.svg"
          alt="forum avatar"
          class="comment-icon"
        />
        &nbsp; ${el.comments.length}
      </p>
    </article>`;
    parentEl.innerHTML += templateTopicsCard;
  });
  if (data.length == 0) {
    parentEl.innerHTML += `<h1 class="un-text"  style="color: #222; text-align: center; margin: 2rem auto;">
      0 topics...
    </h1>`;
  }
});

// load input radio's for categories when creating topics
getData("https://erudite-be.herokuapp.com/v1/forums/").then(json => {
  let categories = $(".category-wrap");
  json.forEach(el => {
    let categoryRadio = ` <div class="form-control-group">
    <input required value="${el._id}" type="radio" name="category" id="${el._id}" />
    <label for="${el._id}">${el.name}</label>
  </div>`;
    categories.innerHTML += categoryRadio;
    console.log(el._id, el.name);
  });
});
