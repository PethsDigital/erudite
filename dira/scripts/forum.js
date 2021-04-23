const loadTemplateStr = (el, i) => {
  $("table tbody").innerHTML += `<tr class="row">
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
  $("table tbody").innerHTML = "";
  let filterData = forumData.filter(el => el.forumName == val);
  filterData.length > 0
    ? filterData.forEach((el, i) => loadTemplateStr(el, i))
    : noContent($("table tbody"), "0 Topics Found");
}

const filterFlagged = () => {
  $("table tbody").innerHTML = "";
  $("#forumName").innerHTML = `Flagged Topics`;
  let filterData = forumData.filter(el => el.isFlagged === true);
  filterData.length > 0
    ? filterData.forEach((el, i) => loadTemplateStr(el, i))
    : noContent($("table tbody"), "0 Topics Found");
};

const filterClosed = () => {
  $("table tbody").innerHTML = "";
  $("#forumName").innerHTML = `Closed Topics`;
  let filterData = forumData.filter(el => el.isClosed === true);
  filterData.length > 0
    ? filterData.forEach((el, i) => loadTemplateStr(el, i))
    : noContent($("table tbody"), "0 Topics Found");
};

// load all topics on load
getData("https://erudite-be.herokuapp.com/v1/topics/").then(data => {
  $("table tbody").innerHTML = "";
  forumData = data;
  console.log(data);
  data.reverse().forEach((el, i) => loadTemplateStr(el, i));
});

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

if ($("tbody")) {
  $("tbody").addEventListener("click", e => {
    if (e.target.className.includes("del-topic")) {
      let requestBody = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      };
      fetch(
        `https://erudite-be.herokuapp.com/v1/topics/delete/${e.target.value}`,
        requestBody
      )
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
    } else if (e.target.className.includes("unflag"))
      takeAction("unflag", e.target.value);
    else if (e.target.className.includes("close-open"))
      takeAction(e.target.getAttribute("data-type"), e.target.value);
  });
}
