const rps = {

  firebaseConfig: {
    apiKey: "AIzaSyDwlGPDQtALZye9Sb2hzhWU3539eCjBous",
    authDomain: "th-rps-multiplayer.firebaseapp.com",
    databaseURL: "https://th-rps-multiplayer.firebaseio.com",
    projectId: "th-rps-multiplayer",
    storageBucket: "th-rps-multiplayer.appspot.com",
    messagingSenderId: "507101621662",
    appId: "1:507101621662:web:3a126e234be85a1db3ba8f"
  },
  database: null,
  playerOneRef: "players/player-one",
  playerTwoRef: "players/player-two",


  init() {
    firebase.initializeApp(this.firebaseConfig);
    this.database = firebase.database();
  },

  setPlayer(name) {
    // Check if player1 Exists.. If so create player 2
    this.database.ref(this.playerOneRef + "/name").once("value").then(function (snapshot) {

      const newPlayer = {
        player: null,
        name: name,
      };
      // Check if player1 exists.
      if(snapshot.val() == null) {
        newPlayer.player = "player-one";
      } else {
        // Does exist, create player2
        newPlayer.player = "player-two";
      }
      rps.createPlayer(newPlayer);
    });
  },

  createPlayer(player) {
    this.database.ref("players/" + player.player).set({
      name: player.name,
      wins: 0,
      losses: 0,
      ties: 0
    });
  }
};

rps.init();


rps.database.ref("players").on("child_added", function(data) {
  const key = data.key;
  const player = data.val();
  console.log("Key: ", key);
  console.log("Data: ", player);

  $("#" + key + " h4.name").text(player.name.length > 0 ? player.name : "");
  $("#" + key + "-wins span").text(player.wins);
  $("#" + key + "-ties span").text(player.ties);
  $("#" + key + "-losses span").text(player.losses);
});

rps.database.ref("players").on("child_changed", function(data) {
  const key = data.key;
  const player = data.val();
  console.log("Key: ", key);
  console.log("Data: ", player);

  $("#" + key + " h4.name").text(player.name.length > 0 ? player.name : "");
  $("#" + key + "-wins span").text(player.wins);
  $("#" + key + "-ties span").text(player.ties);
  $("#" + key + "-losses span").text(player.losses);
});



$(function() {


  $("#add-player").modal({
    backdrop: "static",
    keyboard: false,
  });

  $("#add-player-form").submit(function(event) {
    event.preventDefault();
    const name = $("#player-text").val();
    rps.setPlayer(name);
    $("#add-player").modal("hide");

  });

});

