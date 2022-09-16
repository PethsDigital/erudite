// get fetch request (function getData) declaration and short cut selectors function $ aand $$ are in ./nav-and-footer/nav.js
(function () {
  let topics;
  let parentEl = $("#unanswered");

  // template for unanswered topics
  getData("https://erudite-be.herokuapp.com/v1/topics/")
    .then(json => {
      $(".unanswered .loader").style.display = "flex";
      let data = json.filter(el => el.comments.length == 0);
      if (data.length == 0) {
        parentEl.innerHTML += `<h1 class="un-text"  style="color: #222; text-align: center; margin: 2rem auto;">
        0 topics...
        </h1>`;
      } else {
        data.reverse();
        topics = data;
        return data.map(el => el.userId);
      }
    })
    .then(arr => {
      return fetchUsersData(arr).then(result => {
        $(".unanswered .loader").style.display = "none";
        result.forEach((user, i) => {
          if (user.success) {
            let templateTopicsCard = ` <article class="un-topic-child">
                    <div class="info">
                    <img
                    src="${user.data.avatar}"
                        alt="avatar"
                        class="avatar"
                      />
                      <b class="name">${user.data.username}</b>
                    </div>
                    <a href="./topic.html?id=${topics[i]._id}">
                    ${topics[i].description}</a
                    >
                    <p class="stat">
                      <img
                      src="../images/msg-sq.svg"
                        alt="forum avatar"
                        class="comment-icon"
                        />
                      &nbsp; ${topics[i].comments.length} comments
                    </p>
                    </article>`;
            parentEl.innerHTML += templateTopicsCard;
          }
        });
      });
    });
})();

// template for popular topics
getData("https://erudite-be.herokuapp.com/v1/topics/").then(json => {
  let parentEl = $(".popular.topics");
  let data = json.filter(el => el.views >= 50);
  data.forEach(el => {
    let templateTopicsCard = `<article class="topic-child">
      <a href="./topic.html?id=${el._id}"> ${el.title}</a>
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
  let category_drp_down = $("#drop-down-select");
  json.forEach(el => {
    let list = `<a class="list" href="./forum-topics.html?id=${el._id}">${el.name} Forum</a>`;
    let categoryRadio = ` <div class="form-control-group">
    <input required value="${el._id}" type="radio" name="category" id="${el._id}" />
    <label for="${el._id}">${el.name}</label>
  </div>`;
    if (category_drp_down) {
      category_drp_down.innerHTML += list;
    }
    categories.innerHTML += categoryRadio;
  });
});
