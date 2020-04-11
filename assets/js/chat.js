

$("#message-button").on("click",function(event) {
  event.preventDefault();
  fb.database.ref("chat").push({
    from: sessionStorage.getItem("name"),
    message: $("#message-txt").val(),
    datetime: Date.now()
  });
  $("#message-txt").val("");
});

fb.database.ref("chat").on("child_added", function(data) {
  const message = data.val().from + ": " + data.val().message;
  const chat = $("#chat");
  $(chat).val($(chat).val() + "\n " + message);
  $(chat).scrollTop($(chat)[0].scrollHeight);
});
