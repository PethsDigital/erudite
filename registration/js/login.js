const loginForm = $(".login-form");
// short cut selectors function $ aand $$ are in ./nav-and-footer/nav.js
// function to handle success or error msg is in the nav.js file

loginForm.addEventListener("submit", e => {
  e.preventDefault();

  const loginBtn = $(".login-form .btn");
  loginBtn.textContent = "loading...";
  loginBtn.disabled = true;

  const pwd = $("#pwd");
  const email = $("#email");

  let loginVal = {
    email: email.value,
    password: pwd.value,
  };

  let requestBody = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(loginVal),
    redirect: "follow",
  };

  fetch("https://erudite-be.herokuapp.com/v1/users/login", requestBody)
    .then(res => res.json())
    .then(response => {
      console.log(response);
      if (response.success == true) {
        let userAuth = {
          token: response.data.token,
          user: response.data.user,
        };
        localStorage.setItem("erudite_auth", JSON.stringify(userAuth));
        displayMsg("success", "Login successful", loginForm);
        setTimeout(
          () =>
            (window.location.pathname = window.location.pathname.replace(
              "/registration/login.html",
              "/registration/profile.html"
            )),
          1000
        );
      } else {
        displayMsg("error", "Login Failed", loginForm);
      }
    })
    .catch(err => {
      console.log(`Error: ${err}`);
      displayMsg("error", "Login failed...", loginForm);
    })
    .finally(_ => {
      Array.from($$(".login-form input")).forEach(input => (input.value = ""));
      loginBtn.textContent = "Login";
      loginBtn.disabled = false;
    });
});

// get token with let userAuth = JSON.parse(localStorage.getItem("erudite_auth"));

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
}
