$(".tag").addEventListener("click", e => {
  $(".wrap .drop-down").classList.toggle("show-cat-drp-dw");
  e.target.firstElementChild.classList.toggle("rotate-drp-icon");
});
$("form.discuss-pop-up").addEventListener("submit", e => {
  e.preventDefault();
  if (!userAuth) {
    displayMsg(
      "error",
      `pls Login to enable this action`,
      $("form.discuss-pop-up")
    );
    setTimeout(
      () => (window.location.pathname = "/registration/login.html"),
      3000
    );
  }
  const submit = $("#post-msg");
  submit.textContent = "loading...";
  submit.disabled = true;

  const category = Array.from($$("input[name='category']")).filter(
    el => el.checked
  )[0].value;
  const title = $("#title");
  const description = $("#discussion-input-txt");

  let topicDetails = {
    forumId: category,
    description: description.value,
    title: title.value,
    userId: JSON.parse(localStorage.getItem("erudite_auth")).user.id,
  };

  let requestBody = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(topicDetails),
    redirect: "follow",
  };
  console.log(requestBody);

  fetch("https://erudite-be.herokuapp.com/v1/topics/create", requestBody)
    .then(res => res.json())
    .then(response => {
      console.log(response);
      if (response.success == true) {
        displayMsg("success", response.message, $(".error"));
      } else if (
        response.message.includes("E11000 duplicate key error collection:")
      ) {
        displayMsg("error", "Topic already exists", $(".error"));
      } else {
        displayMsg("error", response.message, $(".error"));
      }
    })
    .catch(err => {
      if (!token) {
        displayMsg(
          "error",
          `pls <a href="../registration/login.html" target="_blank" rel="noopener noreferrer">Login</a>
          or <a href="../registration/signup.html" target="_blank" rel="noopener noreferrer">Sign-up</a> to enable this action`,
          $("form.discuss-pop-up")
        );
      }
      console.log(`Error: ${err}`);
      displayMsg("error", err, $(".error"));
    })
    .finally(_ => {
      $("form.discuss-pop-up").reset();
      submit.textContent = "Submit";
      submit.disabled = false;
    });
});
