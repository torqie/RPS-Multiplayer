

fb.database.ref("players").on("child_added", function(data) {
  const key = data.key;
  const player = data.val();

  $("#" + key + " h4.name").text(typeof player.name != "undefined" ? player.name : "");
  $("#" + key + "-wins span").text(player.wins);
  $("#" + key + "-ties span").text(player.ties);
  $("#" + key + "-losses span").text(player.losses);
});

fb.database.ref("players").on("child_changed", function(data) {
  const key = data.key;
  const player = data.val();

  $("#" + key + " h4.name").text(typeof player.name != "undefined" ? player.name : "");
  $("#" + key + "-wins span").text(player.wins);
  $("#" + key + "-ties span").text(player.ties);
  $("#" + key + "-losses span").text(player.losses);
});

fb.database.ref("players").on("child_removed", function(data) {
  // Todo:: Clear he players card that has left the game, and set back to defaults

  const key = data.key;
  const player = data.val();

  $("#" + key + " h4.name").text(typeof player.name != "undefined" ? player.name : "");
  $("#" + key + "-wins span").text(player.wins);
  $("#" + key + "-ties span").text(player.ties);
  $("#" + key + "-losses span").text(player.losses);
});





