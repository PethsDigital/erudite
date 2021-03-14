let form = document.querySelector("form");
form.addEventListener("submit", e => {
  e.preventDefault();
  $("form .btn").disabled = true;
  $("form .btn").value = "Loading...";

  const raw = {
    email: form.email.value,
    otp: parseInt(form.otp.value),
  };
  var requestOptions = {
    method: "POST",
    body: JSON.stringify(raw),
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  fetch("https://erudite-be.herokuapp.com/v1/users/confirmOtp/", requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.success) {
        $("form .btn").value = data.message;
        window.location.href = "setpassword.html";
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