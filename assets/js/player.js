const player = {

  playerOneRef: "players/player-one",
  playerTwoRef: "players/player-two",
  database: fb.database,

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