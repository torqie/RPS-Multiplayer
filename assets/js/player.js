const player = {

  playerOneRef: "players/player-one",
  playerTwoRef: "players/player-two",
  database: fb.database,

  setPlayer(name) {
    // Check if player1 Exists.. If so create player 2
    this.database.ref("players").once("value").then(function (snapshot) {

      const playerOneName = snapshot.val()["player-one"].name;
      const playerTwoName = snapshot.val()["player-two"].name;

      const newPlayer = {
        player: "",
        name: name,
      };
      // Check if player1 exists.
      if(typeof playerOneName == "undefined") {
        newPlayer.player = "player-one";
      } else if(typeof playerTwoName == "undefined") {
        // Does exist, create player2
        newPlayer.player = "player-two";
      } else {
        return false;
      }
      player.createPlayer(newPlayer);
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