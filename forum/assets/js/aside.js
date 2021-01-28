// get fetch request (function getData) declaration and short cut selectors function $ aand $$ are in ./nav-and-footer/nav.js

// template for unanswered topics
getData("./assets/json/alltitles.json").then(json => {
  let parentEl = $("#unanswered");
  let data = json.filter(el => el.comments.length == 0);
  let name;
  data.forEach(el => {
    // getData(`https://erudite-be.herokuapp.com/v1/users/${el.userId}`).then(
    //   res => {
    //     name = res.name;
    //   }
    // );
    let templateTopicsCard = ` <article class="un-topic-child">
            <div class="info">
              <img
                src="../images/Profile-pic.png"
                alt="avatar"
                class="avatar"
              />
              <b class="name">${name}</b>
            </div>
            <a href="#">
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
  if (data.length == 0) {
    parentEl.innerHTML += `<h1 class="un-text"  style="color: #222; text-align: center; margin: 2rem auto;">
      0 topics...
    </h1>`;
  }
});

// template for popular topics
getData("./assets/json/alltitles.json").then(json => {
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

getData("./assets/json/allforums.json").then(json => {
  let categories = $(".category-wrap");
  json.forEach(el => {
    let categoryRadio = ` <div class="form-control-group">
    <input required value="${el.forumId}" type="radio" name="category" id="${el.forumId}" />
    <label for="${el.forumId}">${el.name}</label>
  </div>`;
    categories.innerHTML += categoryRadio;
  });
});
