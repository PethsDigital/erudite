const loadTemplateStr = (el, i) => {
  $("#forum-topics tbody").innerHTML += `<tr class="row">
            <td>${i + 1}</td>
            <td><a href="https://erudite.ng/forum/topic.html?id=${
              el._id
            }" target="_blank" rel="noopener noreferrer">${el.title}</a></td>
            <td>${el.comments.length}</td>
            <td>
            <svg height="10px" width="10px">
              <circle class="status ${
                el.isFlagged ? "red" : "green"
              }" cx="5" cy="5" r="5" fill="inherit" />
            </svg>
          </td>
            <td>
              <svg height="10px" width="10px">
                <circle class="status ${
                  el.isClosed ? "red" : "green"
                }" cx="5" cy="5" r="5" fill="inherit" />
              </svg>
            </td>
            <td class="act-btn">
              <button type="button" value="${
                el._id
              }" class="btn">Take Action</button>
              <div class="drop-down">
                <button type="button" value="${el._id}" class="list unflag" ${
    el.isFlagged ? "" : "disabled"
  }>Unflag</button>
                <button type="button" value="${
                  el._id
                }" class="list close-open" data-type="${
    el.isClosed ? "open" : "close"
  }" >${el.isClosed ? "Open" : "Close"}</button>
                <button type="button" value="${
                  el._id
                }" class="list del-topic">Delete</button>
              </div>
            </td>
          </tr>`;
};

let forumData;

// filter functions
function filter(val) {
  $("#forumName").innerHTML = `${val} Forum`;
  $("#forum-topics tbody").innerHTML = "";
  let filterData = forumData.filter(el => el.forumName == val);
  filterData.length > 0
    ? filterData.forEach((el, i) => loadTemplateStr(el, i))
    : noContent($("#forum-topics tbody"), "0 Topics Found");
}

const filterFlagged = () => {
  $("#forum-topics tbody").innerHTML = "";
  $("#forumName").innerHTML = `Flagged Topics`;
  let filterData = forumData.filter(el => el.isFlagged === true);
  filterData.length > 0
    ? filterData.forEach((el, i) => loadTemplateStr(el, i))
    : noContent($("#forum-topics tbody"), "0 Topics Found");
};

const filterClosed = () => {
  $("#forum-topics tbody").innerHTML = "";
  $("#forumName").innerHTML = `Closed Topics`;
  let filterData = forumData.filter(el => el.isClosed === true);
  filterData.length > 0
    ? filterData.forEach((el, i) => loadTemplateStr(el, i))
    : noContent($("#forum-topics tbody"), "0 Topics Found");
};

// load all topics on load
getData("https://erudite-be.herokuapp.com/v1/topics/")
  .then(data => {
    $("#forum-topics tbody").innerHTML = "";
    forumData = data;
    console.log(data);
    data.reverse().forEach((el, i) => loadTemplateStr(el, i));
  })
  .finally(el => ($(".pre-loader").style.display = "none"));

// load forum topics on change of selector
$(".select-cat").addEventListener("change", e => {
  if (e.target.value == "") location.reload();
  else if (e.target.value === "flagged") filterFlagged();
  else if (e.target.value === "closed") filterClosed();
  else filter(e.target.value);
});

// take action function
const takeAction = (type, id) => {
  var requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    redirect: "follow",
  };
  fetch(
    `https://erudite-be.herokuapp.com/v1/topics/${type}/${id}`,
    requestOptions
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
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
};

// function to delete either topic or forum
const delAction = (type, id) => {
  let requestBody = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    redirect: "follow",
  };
  fetch(`https://erudite-be.herokuapp.com/v1/${type}/delete/${id}`, requestBody)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      if (json.success) {
        displayMsg("success", json.message);
        setTimeout(() => location.reload(), 1500);
      } else {
        displayMsg("error", json.message);
      }
    });
};

let forumId;
let editCategory = $("#edit-category");

// event listeners for forum actions
if ($("main.inner")) {
  $("main.inner").addEventListener("click", e => {
    console.log(e.target);
    if (e.target.className.includes("del-topic"))
      delAction("topics", e.target.value);
    else if (e.target.className.includes("unflag"))
      takeAction("unflag", e.target.value);
    else if (e.target.className.includes("close-open"))
      takeAction(e.target.getAttribute("data-type"), e.target.value);
    else if (e.target.className.includes("del-forum"))
      delAction("forums", e.target.value);
    else if (e.target.className.includes("edit-forum")) {
      editCategory.style.display = "block";
      $(".overlay").style.display = "block";
      forumId = e.target.value;
    }
  });
}

// edit category
editCategory.addEventListener("submit", e => {
  e.preventDefault();
  const submit = editCategory.posBtn;
  submit.textContent = "loading...";
  submit.disabled = true;
  let forumBody = {
    name: editCategory.title.value,
  };

  let requestBody = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(forumBody),
    redirect: "follow",
  };
  console.log(forumBody);

  fetch(
    `https://erudite-be.herokuapp.com/v1/forums/edit/${forumId}`,
    requestBody
  )
    .then(res => res.json())
    .then(response => {
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
      editCategory.reset();
      submit.textContent = "Edit";
      submit.disabled = false;
    });
});
