function loadTemplate(url) {
  $(".pre-loader").style.display = "flex";
  getData(url).then(data => {
    $("#forumName").innerHTML = `${data.forum} Forum`;
    $("table tbody").innerHTML = "";
    data.topics.reverse().forEach(el => {
      $("table tbody").innerHTML += `<tr class="row">
            <td><input type="checkbox" /></td>
            <td>${el.title}</td>
            <td>${el.comments.length}</td>
            <td class="act-btn">
              <button type="button" value="${el._id}" class="btn">Take Action</button>
              <div class="drop-down">
                <button type="button" value="${el._id}" class="list">Edit</button>
                <button type="button" value="${el._id}" class="list">Close</button>
                <button type="button" value="${el._id}" class="list">Delete</button>
              </div>
            </td>
          </tr>`;
    });
    $(".pre-loader").style.display = "none";
  });
}

// load all topics on load
getData("https://erudite-be.herokuapp.com/v1/topics/").then(data => {
  $("table tbody").innerHTML = "";
  data.reverse().forEach(el => {
    $("table tbody").innerHTML += `<tr class="row">
            <td><input type="checkbox" /></td>
            <td>${el.title}</td>
            <td>${el.comments.length}</td>
            <td class="act-btn">
              <button type="button" value="${el._id}" class="btn">Take Action</button>
              <div class="drop-down">
                <button type="button" value="${el._id}" class="list edit-topic">Edit</button>
                <button type="button" value="${el._id}" class="list close-topic">Close</button>
                <button type="button" value="${el._id}" class="list del-topic">Delete</button>
              </div>
            </td>
          </tr>`;
  });
});

// load forum topics on change of selector
$(".select-cat").addEventListener("change", e => {
  if (e.target.value == "") {
    location.reload();
  }
  loadTemplate(
    `https://erudite-be.herokuapp.com/v1/topics/forum/${e.target.value}`
  );
});

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
    }
  });
}
