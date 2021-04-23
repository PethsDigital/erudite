getData("https://erudite-be.herokuapp.com/v1/forums/").then(data => {
  $(".totForum").innerHTML = data.length;
  data.forEach((el, i) => {
    if ($(".grid.expand2")) {
      $(".grid.expand2").innerHTML += ` <div>
          <p class="topic">${el.name}</p>
          <p>${el.topics.length} Topics</p>
        </div>`;
    }
    if ($("#forumList")) {
      $("#forumList tbody").innerHTML += `<tr class="row">
      <td>${i + 1}</td>
      <td><a href="https://erudite.ng/forum/forum-topics.html?id=${
        el._id
      }" target="_blank" rel="noopener noreferrer">${el.name}</a></td>
      <td>${el.topics.length}</td>
      <td class="act-btn">
        <button type="button" value="${el._id}" class="btn">Take Action</button>
        <div class="drop-down">    
          <button type="button" value="${
            el._id
          }" class="list edit-forum" >Edit</button>
          <button type="button" value="${
            el._id
          }" class="list del-forum">Delete</button>
        </div>
      </td>
    </tr>`;
    }
    if ($(".select-cat")) {
      $(
        ".select-cat"
      ).innerHTML += `<option value="${el.name}">${el.name}</option>`;
    }
  });

  let topicLength = 0;
  let topics = data
    .map(el => el.topics)
    .forEach(el => (topicLength += el.length));
  $(".totTopic").innerHTML = topicLength;
  console.log(data, topics);
});

getData("https://erudite-be.herokuapp.com/v1/topics/").then(
  data =>
    ($(".awaitMod").innerHTML = data.filter(el => el.isFlagged === true).length)
);
