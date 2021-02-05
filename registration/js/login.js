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
        // setTimeout(() => {
        //   window.location.replace("http://localhost:5501/");
        // }, 1000);
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
