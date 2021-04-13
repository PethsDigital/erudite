let form = document.querySelector("form");
form.addEventListener("submit", e => {
  e.preventDefault();
  $("form .btn").disabled = true;
  $("form .btn").value = "Loading...";

  const raw = {
    email: JSON.parse(localStorage.getItem("otp")).email,
    otp: parseInt(JSON.parse(localStorage.getItem("otp")).otp),
    password: form.password.value,
  };
  var requestOptions = {
    method: "PATCH",
    body: JSON.stringify(raw),
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  fetch(
    "https://erudite-be.herokuapp.com/v1/users/changePassword/",
    requestOptions
  )
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        $("form .btn").value = data.message;
        window.location.href = "login.html";
        displayMsg("success", data.message);
      } else {
        displayMsg("error", data.message);
      }
    })
    .catch(error => {
      displayMsg("error", "Authentication failed");
      console.log(error);
    })
    .finally(_ => {
      $("form .btn").disabled = false;
      $("form .btn").value = "Submit";
    });
});
