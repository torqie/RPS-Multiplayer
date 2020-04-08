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

  $("#players .choice").on("click", function () {
    // Store choice selected
    const choice = $(this).attr("data-type"); //rock, paper, scissors

    // Disable choice buttons
    $(this).parent().children().prop("disabled", true);

    // Update firebase with players choice

    player.setChoice(choice);
  });

});

window.onbeforeunload = function() {

};

