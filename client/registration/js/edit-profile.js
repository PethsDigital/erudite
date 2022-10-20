let avatarVal;
window.onload = function () {
  if (userAuth) {
    getData(
      `https://erudite-be.herokuapp.com/v1/users/${userAuth.user.id}`
    ).then(user => {
      $("#username").placeholder = user.username;
      $(".edit-user.user-details img").src = user.avatar;
      avatarVal = user.avatar;
      $$(".avatar").forEach(el => {
        if (el.firstElementChild.src == avatarVal) {
          el.classList.add("current");
        }
      });
      document.body.style.pointerEvents = "all";
      $(".pre-loader").style.display = "none";
    });
    $(".edit-user img").src = avatarVal;
    $(".edit-user .btn").addEventListener("click", e => {
      $(".modal").style.display = "block";
      $(".overlay").style.display = "block";
    });
  } else {
    window.location.pathname = window.location.pathname.replace(
      "/registration/edit-profile.html",
      "/registration/login.html"
    );
  }
};
$$(".avatar").forEach(el => {
  el.addEventListener("click", e => {
    $$(".avatar").forEach(el => el.classList.remove("current"));
    el.classList.add("current");
    avatarVal = e.target.src;
    console.log(avatarVal);
    $(".edit-user img").src = avatarVal;
  });
});
$(".avatar-wrap .close-modal").addEventListener("click", e => {
  $(".modal").style.display = "none";
  $(".overlay").style.display = "none";
});

$("#edit-profile").addEventListener("submit", e => {
  e.preventDefault();

  const editBtn = $("#edit-profile #edit-btn");
  editBtn.textContent = "loading...";
  editBtn.disabled = true;

  const username = $("#edit-profile #username");

  let loginVal = {
    avatar: avatarVal,
    username: username.value,
  };

  let requestBody = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(loginVal),
    redirect: "follow",
  };
  fetch(
    `https://erudite-be.herokuapp.com/v1/users/edit/${
      JSON.parse(localStorage.getItem("erudite_auth")).user.id
    }`,
    requestBody
  )
    .then(res => res.json())
    .then(response => {
      console.log(response);
      if (response.success == true) {
        localStorage.setItem("erudite_auth", JSON.stringify(response.data));
        userAuth = JSON.parse(localStorage.getItem("erudite_auth"));
        displayMsg("success", "Profile Edited");
        editBtn.innerHtml = `Profile saved`;
        setTimeout(() => window.location.reload(), 1500);
      } else {
        displayMsg("error", response.message);
      }
    })
    .catch(err => {
      console.log(`Error: ${err}`);
      displayMsg("error", "This action failed");
      $(".edit-user img").src = userAuth.user.avatar;
    })
    .finally(_ => {
      Array.from($$("#edit-profile input")).forEach(
        input => (input.value = "")
      );
      editBtn.textContent = "Edit Profile";
      editBtn.disabled = false;
    });
});