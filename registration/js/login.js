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
  // console.log(googleUser.getAuthResponse().id_token);
  console.log(profile);
  let userId = profile.getId();
  // gapi.auth.setToken({access_token: googleUser.getAuthResponse().id_token});
  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
  console.log("Email: " + profile.getEmail());
  fetch(
    ` https://people.googleapis.com/v1/people/me?personFields=genders,emailAddresses`
  )
    .then(res => res.json())
    .then(res => console.log(res));
  // This is null if the 'email' scope is not present.
}
function requestEmailData() {
  gapi.client.load("oauth2", "v2", function () {
    gapi.client.oauth2.userinfo.get().execute(function (resp) {
      // Shows user email
      console.log(resp);
    });
  });
}
function signout() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
}
// https://erudite-be.herokuapp.com/v1/users/google/callback?code=4%2F0AY0e-g5Mqh5ktoI0gHGUKJH1uktJbPJ1jTePdmXn-0xKNWUZQ6R3isUQNmZXwsFiXMqYmA&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuser.phonenumbers.read+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuser.gender.read&authuser=0&prompt=none
// function requestProfileData() {
//   gapi.client.load("plus", "v1", function () {
//     gapi.client.plus.people.get({userId: "me"}).execute(function (resp) {
//       // Shows profile information
//       console.log(resp);
//     });
//   });
// }

// function onSignIn() {
//   gapi.load("client", function () {
//     // based on http://stackoverflow.com/a/15384981
//     requestEmailData();
//     // requestProfileData();
//   });
// }
