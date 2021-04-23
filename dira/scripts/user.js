let banForm = $("#banForm");
let banUserId;
$("#users-table").addEventListener("click", e => {
  if (e.target.className.includes("banBtn")) {
    $(".overlay").style.display = "block";
    banForm.style.display = "block";
    banUserId = e.target.value;
  }
});

banForm.addEventListener("submit", e => {
  e.preventDefault();
  banForm.submit.disabled = true;
  banForm.submit.innerHTML = "...loading";
  const requestBody = {
    bannedUntil: banForm.bannedUntil.value,
    banReason: banForm.banReason.value,
  };
  var requestOptions = {
    method: "PATCH",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    redirect: "follow",
  };
  fetch(
    `https://erudite-be.herokuapp.com/v1/users/ban/${banUserId}`,
    requestOptions
  )
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        displayMsg("success", data.message);
        setTimeout(() => location.reload(), 1500);
      } else {
        displayMsg("error", data.message);
      }
    })
    .catch(error => {
      displayMsg("error", "Action failed, pls try again");
      console.log(error);
    })
    .finally(e => {
      banForm.submit.disabled = false;
      banForm.submit.innerHTML = "Ban";
      banUserId = "";
    });
});

$("#users-table").addEventListener("click", e => {
  if (e.target.className.includes("unban")) {
    console.log(e.target.value);
    var requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      redirect: "follow",
    };
    fetch(
      `https://erudite-be.herokuapp.com/v1/users/unban/${e.target.value}`,
      requestOptions
    )
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          displayMsg("success", data.message);
          setTimeout(() => location.reload(), 1500);
        } else {
          displayMsg("error", data.message);
        }
      })
      .catch(error => {
        displayMsg("error", "Action failed, pls try again");
        console.log(error);
      });
  }
});
