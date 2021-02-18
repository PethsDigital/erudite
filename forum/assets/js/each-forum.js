// get fetch request (function getData) declaration and short cut selectors function $ aand $$ are in ./nav-and-footer/nav.js

// template function to get topics depending on route
let urlId = window.location.href.split("?").pop().split("=")[1];

getData(`https://erudite-be.herokuapp.com/v1/topics/forum/${urlId}`).then(
  json => {
    console.log(json);
    $(".title-n-nav .tag").innerHTML = `${json.forum} Forum`;
    let parentEl = $(".topics-wrap");
    json.topics.reverse().forEach(el => {
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
      parentEl.innerHTML += templateTopicsCard;
    });
  }
);
