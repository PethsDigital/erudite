const topicBtn = $("#topic-btn");
const commentBtn = $("#comment-btn");
commentBtn.addEventListener("click", e => {
  if (!e.target.className.includes("active")) {
    $(".topics").style.display = "none";
    $(".user-comments").style.display = "block";
    e.target.classList.toggle("active");
    topicBtn.classList.toggle("active");
  } else {
    return;
  }
});
topicBtn.addEventListener("click", e => {
  if (!e.target.className.includes("active")) {
    $(".topics").style.display = "block";
    $(".user-comments").style.display = "none";
    e.target.classList.toggle("active");
    commentBtn.classList.toggle("active");
  } else {
    return;
  }
});
