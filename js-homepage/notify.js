// short cut selectors function $ aand $$ are in ./nav-and-footer/nav.js
// function to handle success or error msg is in the nav.js file
const subscribe = $(".notify-email");

subscribe.addEventListener("submit", e => {
  e.preventDefault();

  const subscribeBtn = $(".notify-email .btn");
  subscribeBtn.textContent = "loading...";
  subscribeBtn.disabled = true;

  let emailVal = {
    email: $("#get-email").value,
  };
  console.log(JSON.stringify(emailVal));

  let requestBody = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailVal),
    redirect: "follow",
  };

  fetch("https://erudite-be.herokuapp.com/v1/updates/subscribe/", requestBody)
    .then(res => res.json())
    .then(response => {
      console.log(response);
      if (response.success == true) {
        displayMsg("success", response.message, subscribe);
      } else {
        displayMsg("error", response.message, subscribe);
      }
    })
    .catch(err => {
      console.log(`Error: ${err}`);
      displayMsg("error", "Request not sent...", subscribe);
    })
    .finally(_ => {
      subscribe.reset();
      subscribeBtn.textContent = "Login";
      subscribeBtn.disabled = false;
    });
});
