// shortcut querySelector
const $ = el => document.querySelector(el);
const $$ = el => document.querySelectorAll(el);
function catchErr(err) {
  $(".pre-loader").style.display = "none";
  $("main").innerHTML = `
  <div class="oops">
    <svg
      class="heart"
      width="70"
      height="70"
      viewBox="0 0 20 20"
      fill="none"
      fill-rule="evenodd"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path
        d="M19 4.8a16 16 0 00-2-1.2m-3.3-1.2A16 16 0 001.1 4.7M16.7 8a12 12 0 00-2.8-1.4M10 6a12 12 0 00-6.7 2M12.3 14.7a4 4 0 00-4.5 0M14.5 11.4A8 8 0 0010 10M3 16L18 2M10 18h0"
      ></path>
    </svg>
    <br />
    <h1>Oops!</h1>
    <p>An error ocurred, you might want to check your network connection</p>
  </div>`;
  document.body.style.pointerEvents = "all";
  console.log(err.message, $("main"));
}
function getData(url) {
  return fetch(url)
    .then(res => res.json())
    .then(json => json.data)
    .catch(err => catchErr(err));
}

function displayMsg(type, resMsg, el) {
  let msg;
  msg = document.createElement("p");
  msg.className = "msg";
  document.body.insertBefore(msg, document.body.firstElementChild);
  if (type === "success") {
    msg.innerHTML = `&check; &nbsp; ${resMsg}`;
  } else {
    msg.innerHTML = `&#9888; &nbsp;${resMsg}`;
    msg.style.background = "rgb(248, 20, 3)";
  }
  setTimeout(() => {
    msg.style.display = "none";
  }, 4500);
}

let userData, allUsers;
// to store userVerification
let userAuth = JSON.parse(localStorage.getItem("erudite_auth"));
let token = userAuth
  ? JSON.parse(localStorage.getItem("erudite_auth")).token
  : "";
window.addEventListener("load", async e => {
  if (userAuth.user.is_admin) {
    // logout
    $("#sign-out").addEventListener("click", e => {
      localStorage.clear();
      userAuth = "";
      displayMsg("success", "Logout successful");
      setTimeout(
        () =>
          (window.location.href = "https://erudite.ng/registration/login.html"),
        1000
      );
    });

    // date
    let date = document.querySelector(".date");
    let currDate = new Date().toDateString();
    date.innerHTML = currDate;

    // All Users
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    let userRequest = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch("https://erudite-be.herokuapp.com/v1/users/", userRequest)
      .then(response => response.json())
      .then(result => {
        $(".pre-loader").style.display = "none";
        allUsers = result.data;
        let totalUser = document.querySelector(".totUser");
        if (totalUser) {
          totalUser.innerHTML = result.data.length;
        }
        // console.log(allUsers);
        // load users data on users page
        if ($("#users-table tbody")) {
          allUsers.forEach(el => {
            $("#users-table tbody").innerHTML += `<tr class="row">
            <td><input type="checkbox" /></td>
            <td>@${el.username}</td>
            <td><a href="mailto:${el.email}">${el.email}</a></td>
            <td>${el.topics.length}</td>
            <td>
              <svg height="10px" width="10px">
                <circle class="status ${
                  el.bannedUntil ? "red" : "green"
                }" cx="5" cy="5" r="5" fill="inherit" />
              </svg>
            </td>
            <td class="act-btn">
              <button type="button" class="btn">User Action</button>
              <div class="drop-down">
                
                <button type="button" ${
                  el.bannedUntil ? "disabled" : ""
                } value=${el._id} class="list banBtn">Ban</button>
                <button type="button" ${
                  el.bannedUntil ? "" : "disabled"
                } value=${el._id} class="list unban">Unban</button>
              </div>
            </td>
          </tr>`;
          });
        }
      })
      .catch(error => catchErr(error));

    // load admin data
    $("img.user").src = userAuth.user.avatar;
    $(".profile-pic").src = userAuth.user.avatar;
    $(".userId2").innerHTML = userAuth.user.name;
    if ($(".userId")) {
      $(".userId").innerHTML = userAuth.user.name;
    }

    // create new category
    $("#create-category").addEventListener("submit", e => {
      e.preventDefault();
      const submit = $("#post-msg");
      submit.textContent = "loading...";
      submit.disabled = true;
      let forumBody = {
        name: $("#title").value,
        userId: JSON.parse(localStorage.getItem("erudite_auth")).user.id,
      };

      let requestBody = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(forumBody),
        redirect: "follow",
      };
      console.log(forumBody);

      fetch("https://erudite-be.herokuapp.com/v1/forums/create", requestBody)
        .then(res => res.json())
        .then(response => {
          console.log(response);
          if (response.success == true) {
            displayMsg("success", response.message, $(".error"));
          } else {
            displayMsg("error", response.message, $(".error"));
          }
        })
        .catch(err => {
          console.log(`Error: ${err}`);
          displayMsg("error", err, $(".error"));
        })
        .finally(_ => {
          $("#create-category").reset();
          submit.textContent = "Create";
          submit.disabled = false;
        });
    });
  } else {
    window.location.href = "https://erudite.ng/registration/login.html";
  }
});
