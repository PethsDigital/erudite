getData("https://erudite-be.herokuapp.com/v1/forums/").then(data => {
  $(".pre-loader").style.display = "none";
  $(".totForum").innerHTML = data.length;
  data.forEach(el => {
    if ($(".grid.expand2")) {
      $(".grid.expand2").innerHTML += ` <div>
          <p class="topic">${el.name}</p>
          <p>${el.topics.length} Topics</p>
        </div>`;
    }
    if ($(".select-cat")) {
      $(
        ".select-cat"
      ).innerHTML += `<option value="${el._id}">${el.name}</option>`;
    }
  });

  let topicLength = 0;
  let topics = data
    .map(el => el.topics)
    .forEach(el => (topicLength += el.length));
  $(".totTopic").innerHTML = topicLength;
  console.log(data, topics);
});
