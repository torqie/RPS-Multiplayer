$(function() {
  $("#add-player").modal({
    backdrop: "static",
    keyboard: false,
  });

  $("#add-player-form").submit(function(event) {
    event.preventDefault();
    const name = $("#player-text").val();
    player.setPlayer(name);
    $("#add-player").modal("hide");
  });
});

