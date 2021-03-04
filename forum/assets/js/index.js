// get fetch request (function getData) declaration and short cut selectors function $ aand $$ are in ./nav-and-footer/nav.js

// template function to get topics depending on route
$(".title-n-nav .tag").innerHTML = `Erudite Forum`;
(function () {
  let allTopics;
  let topicsWrap = $(".topics-wrap");
  getData("https://erudite-be.herokuapp.com/v1/topics/")
    .then(json => {
      let lastTenComments = json.slice(-10).reverse();

      allTopics = lastTenComments;

      if (json.length <= 0) {
        return ($(".main-discussion.right").innerHTML = `<div class="oops">
  <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" class="heart"
  width="100"
  height="100" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M23.5,27.5H6.5l-1-15.19a.76.76,0,0,1,.77-.81H10a1.11,1.11,0,0,1,.89.44l1.22,1.56H23.5v2"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M26.3,20.7l.84-3.2H9.25L6.5,27.5H23.41a1.42,1.42,0,0,0,1.37-1.06l.76-2.88"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M16.5,24.5h0a1.42,1.42,0,0,1,2,0h0"/><line x1="13.5" x2="14.5" y1="21.5" y2="21.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><line x1="20.5" x2="21.5" y1="21.5" y2="21.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M20.62,3.61C18.25,4,16.5,5.37,16.5,7a2.57,2.57,0,0,0,.7,1.7l-.7,2.8,2.86-1.43A8.12,8.12,0,0,0,22,10.5c3,0,5.5-1.57,5.5-3.5,0-1.6-1.69-2.95-4-3.37"/><line x1="21.25" x2="22.75" y1="6.25" y2="7.75" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><line x1="22.75" x2="21.25" y1="6.25" y2="7.75" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <br />
  <h1>Oops!</h1>
  <p>Topic not found</p>
  <p>Click on "Start-discussion" to create a new topic for discussion</p>
  </div>`);
      } else {
        return lastTenComments.map(el => el.userId);
      }
    })
    .then(arr => {
      return fetchUsersData(arr).then(result => {
        result.forEach((user, i) => {
          if (user.success) {
            let templateTopicsCard = `<article class="topics-card">
                  <div class="wrapper">
                    <img
                      src="${user.data.avatar}"
                      alt="avatar"
                      class="topic-img"
                    />
                    <div class="text">
                      <h2 class="tp-title">
                        <a href="./topic.html?id=${allTopics[i]._id}">
                          ${allTopics[i].title}
                        </a>
                      </h2>
                      <a href="./topic.html?id=${allTopics[i]._id}" class="question">
                       ${allTopics[i].description}
                      </a>
                    </div>
                  </div>
                  <div class="stat-info">
                    <p class="cm-icon">${allTopics[i].comments.length}</p>
                    <hr />
                    <p class="views"><i class="fa fa-eye"> &nbsp; </i>${allTopics[i].views}</p>
                  </div>
                  </article>`;
            topicsWrap.innerHTML += templateTopicsCard;
          }
        });
      });
    })
    .catch(err => {
      $("main").style.display = "none";
      $(".pre-loader").style.display = "none";
      $(".oops").style.display = "flex";
      console.log(err.message);
    })
    .finally(_ => {
      document.body.style.pointerEvents = "all";
    });
})();

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
  });
});

(function () {
  let topics;

  let parentEl = $("#active");
  // template for unanswered topics
  getData("https://erudite-be.herokuapp.com/v1/topics/")
    .then(json => {
      let data = json.filter(el => el.comments.length >= 40);
      if (data.length == 0) {
        parentEl.innerHTML += `<h1 class="un-text"  style="color: #222; text-align: center; margin: 2rem auto;">
        0 topics...
        </h1>`;
      } else {
        data.reverse();
        topics = data;
        return fetchUsersData(data.map(el => el.userId));
      }
    })
    .then(result => {
      if (result) {
        result.forEach((user, i) => {
          if (user.success) {
            let templateTopicsCard = ` <article class="un-topic-child">
                        <div class="info">
                          <img
                            src="${user.data.avatar}"
                            alt="avatar"
                            class="avatar"
                          />
                          <b class="name">${user.data.name}</b>
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
      }
    });
})();
