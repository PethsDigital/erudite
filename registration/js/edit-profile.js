let avatarVal;

$(".edit-user .btn").addEventListener("click", e => {
  $(".modal").style.display = "block";
  $(".overlay").style.display = "block";
});

$$(".avatar").forEach(el => {
  el.addEventListener("click", e => {
    $$(".avatar").forEach(el => el.classList.remove("current"));
    el.classList.add("current");
    avatarVal = e.target.src;
    console.log(avatarVal);
  });
});
$(".avatar-wrap .close-modal").addEventListener("click", e => {
  $(".modal").style.display = "none";
  $(".overlay").style.display = "none";
});
