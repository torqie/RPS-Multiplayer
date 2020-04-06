

fb.database.ref("players").on("child_added", function(data) {
  const key = data.key;
  const player = data.val();
  console.log("Key: ", key);
  console.log("Data: ", player);

  $("#" + key + " h4.name").text(player.name.length > 0 ? player.name : "");
  $("#" + key + "-wins span").text(player.wins);
  $("#" + key + "-ties span").text(player.ties);
  $("#" + key + "-losses span").text(player.losses);
});

fb.database.ref("players").on("child_changed", function(data) {
  const key = data.key;
  const player = data.val();

  $("#" + key + " h4.name").text(player.name.length > 0 ? player.name : "");
  $("#" + key + "-wins span").text(player.wins);
  $("#" + key + "-ties span").text(player.ties);
  $("#" + key + "-losses span").text(player.losses);
});

