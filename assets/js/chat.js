

$("#message-button").on("click",function() {
  fb.database.ref("chat").push({
    from: sessionStorage.getItem("name"),
    message: $("#message-txt").val(),
    datetime: Date.now()
  });
});

fb.database.ref("chat").on("child_added", function(data) {
  const message = $("<div>");
  message.text(data.val().from + ": " + data.val().message);
  const chat = $("#chat");
  $(chat).append(message);
});
