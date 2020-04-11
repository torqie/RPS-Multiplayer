$(function() {
  if (sessionStorage.getItem("player") === null) {
    $("#add-player").modal({
      backdrop: "static",
      keyboard: false,
    });
  }

  $("#add-player-form").submit(function(event) {
    event.preventDefault();
    const name = $("#player-text").val();
    player.setPlayer(name);
    $("#add-player").modal("hide");
  });

  $(".choice").on("click", function () {
    // Store choice selected
    const choice = $(this).attr("data-type"); //rock, paper, scissors
    console.log("choice", choice);

    // Disable choice buttons
    $(".choice").prop("disabled", true).addClass("disabled");


    // Update firebase with players choice
    setTimeout(function() {player.setChoice(choice)}, 1000);
  });

});

window.addEventListener('unload', function(e) {
  player.removePlayer(sessionStorage.getItem("player"));
  return "Are you sure you want to leave?"
}, false);


