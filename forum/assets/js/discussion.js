// get fetch request (function getData) declaration and short cut selectors function $ aand $$ are in ./nav-and-footer/nav.js

// template function to get topics depending on route
// let url = window.location.href.split("?").pop().split("=")[1];

getData("./assets/json/discussion.json").then(json => {
  let parentEl = $(".description");
  let name;
  // getData(`https://erudite-be.herokuapp.com/v1/users/${json.userId}`).then(
  //   res => {
  //     name = res.name;
  //   }
  // );
  let topicDescription = `<article class="main-question thread-wrap">
            <img src="../images/Ellipse 27 (1).png" alt="avatar" />
            <div class="text">
              <div class="info">
                <b class="name">${name}</b>
                <p class="time-posted">3 hours ago</p>
              </div>
              <p class="text-msg">
               ${json.description}
              </p>
            </div>
          </article>`;
  parentEl.innerHTML += topicDescription;

  // get comments
  $("#com-num").innerHTML = `${json.comments.length} Comments`;
  let commentWrap = $(".comments-wrapper");
  json.comments.forEach(el => {
    let commentTemplate = `<article class="first-level-comment thread-wrap">
    <img src="../images/Ellipse 27 (1).png" alt="avatar" />
    <div class="text">
      <div class="info">
        <b class="name">James Mba</b>
      </div>
      <p class="text-msg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
        repudiandae dolorum dolorem est reprehenderit consectetur
        aperiam magnam ullam tempora hic?
      </p>
      <br />
      <div class="info">
        <button type="button" class="like">Like</button>
        <button type="button" class="reply">Reply</button>
        <p class="time-posted">3 hrs ago</p>
        <p class="time-posted like-count">22 Likes</p>
      </div>
      <br />
  
      <!-- PS: this form below is a template for javascript to hold onto it wont be displayed but cloned -->
      <div
        id="reply-comment-wrap"
        class="comment-box-wrap thread-wrap reply-comment-wrap"
      >
        <form class="comment-box reply-comment">
          <textarea
            required
            id="comment-input"
            placeholder="Type here to comment or reply the question"
          ></textarea>
          <div class="btn-group">
            <button class="btn submit-reply" type="submit">
              Post comment
            </button>
            <button type="reset" class="btn btn-cancel" type="button">
              Cancel
            </button>
          </div>
        </form>
        <br />
      </div>
      <article class="second-level-commentm thread-wrap">
        <img src="../images/Ellipse 27 (1).png" alt="avatar" />
        <div class="text">
          <div class="info">
            <b class="name">James Mba</b>
          </div>
          <p class="text-msg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Optio repudiandae dolorum dolorem est reprehenderit
            consectetur aperiam magnam ullam tempora hic?
          </p>
          <br />
          <div class="info">
            <button type="button" class="like">Like</button>
            <p class="time-posted">3 hrs ago</p>
            <p class="time-posted like-count">22 Likes</p>
          </div>
        </div>
      </article>
    </div>
  </article>`;
    commentWrap.innerHTML += commentTemplate;
  });
});
