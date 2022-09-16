// short cut selectors function $ aand $$ are in ./nav-and-footer/nav.js
// function to handle success or error msg is in the nav.js file

const signupForm = $(".signup-form ");

signupForm.addEventListener("submit", e => {
  e.preventDefault();

  if (!$("#email").value.includes(".")) {
    displayMsg("error", "invalid email", signupForm);
  } else if ($("#phone-num").value.length < 11) {
    displayMsg("error", "Incorrect phone number", signupForm);
  } else if ($("#gender").value == "null") {
    displayMsg("error", "choose a correct gender", signupForm);
  } else if ($("#pwd").value === $("#confirmpwd").value) {
    const loginBtn = $(".signup-form .btn");
    loginBtn.textContent = "loading...";
    loginBtn.disabled = true;

    let loginVal = {
      email: $("#email").value,
      name: $("#name").value,
      gender: $("#gender").value,
      username: $("#username").value,
      phone: $("#phone-num").value,
      password: $("#pwd").value,
    };

    let requestBody = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify(loginVal),
      redirect: "follow",
    };

    fetch("https://erudite-be.herokuapp.com/v1/users/register", requestBody)
      .then(res => res.json())
      .then(response => {
        console.log(response);
        if (response.success == true) {
          displayMsg("success", response.message, signupForm);
          setTimeout(
            () =>
              (window.location.pathname = window.location.pathname.replace(
                "registration/signup.html",
                "registration/login.html"
              )),
            1000
          );
        } else {
          displayMsg("error", response.message, signupForm);
        }
      })
      .catch(err => {
        console.log(`Error: ${err}`);
        displayMsg("error", "Login failed...", signupForm);
      })
      .finally(_ => {
        Array.from($$(".signup-form input")).forEach(
          input => (input.value = "")
        );
        loginBtn.textContent = "Sign Up";
        loginBtn.disabled = false;
      });
  } else {
    displayMsg("error", "password confirmation doesn't match", signupForm);
  }
});

// get token with let userAuth = JSON.parse(localStorage.getItem("erudite_auth"));
