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
        sessionStorage.setItem("player", "player-one");
      } else if(typeof playerTwoName == "undefined") {
        // Does exist, create player2
        newPlayer.player = "player-two";
        sessionStorage.setItem("player", "player-two");
      } else {
        return false;
      }
      player.createPlayer(newPlayer);
    });
  },

  createPlayer(player) {
    sessionStorage.setItem("name", player.name);
    this.database.ref("players/" + player.player).set({
      name: player.name,
      wins: 0,
      losses: 0,
      ties: 0
    });
  },

  removePlayer(player) {
    this.resetScore();
    this.resetChat();
    sessionStorage.clear();
    this.database.ref("players/" + player).child("name").remove();
  },

  resetScore() {
   this.database.ref("players/player-one").update({
      wins: 0,
      ties: 0,
      losses: 0,
    });

    this.database.ref("players/player-two").update({
      wins: 0,
      ties: 0,
      losses: 0,
    });
  },

  resetChat() {
    this.database.ref("chat").remove();
    $("#chat").empty();
  },

  setChoice(choice) {
    this.database.ref("players/" + sessionStorage.getItem("player")).update({
      choice: choice
    });
    this.checkChoices();
  },

  checkChoices() {
    this.database.ref("players").once("value", function(snapshot) {
      const playerOneChoice = snapshot.val()["player-one"].choice;
      const playerTwoChoice = snapshot.val()["player-two"].choice;

      if(typeof playerOneChoice != "undefined" && typeof playerTwoChoice != "undefined") {

        if(playerOneChoice === playerTwoChoice) {
          // Tie
          player.playerTies("player-one");
          player.playerTies("player-two");

        } else if(playerOneChoice === "rock" && playerTwoChoice === "scissors") {
          // Player One Wins
          player.playerWins("player-one");
          player.playerLosses("player-two");

        } else if(playerOneChoice === "paper" && playerTwoChoice === "rock") {
          // Player One Wins
          player.playerWins("player-one");
          player.playerLosses("player-two");

        } else if(playerOneChoice === "scissors" && playerTwoChoice === "paper") {
          // Player One Wins
          player.playerWins("player-one");
          player.playerLosses("player-two");

        } else {
          // Player Two Wins
          player.playerWins("player-two");
          player.playerLosses("player-one");
        }

        //Todo:: Show game log in chat window.

        // Todo:: Clear Choices
       player.database.ref("settings").update({
         restart: true
       });
      }
    });
  },

  clearChoices() {
    this.database.ref("players/player-one").child("choice").remove();
    this.database.ref("players/player-two").child("choice").remove();
    $(".choice").prop("disabled", false);

    player.database.ref("settings").update({
      restart: false
    });

  },

  playerWins(player) {

    this.database.ref("players/" + player).child("wins").transaction(function(wins) {
      return (wins || 0) + 1;
    });
  },

  playerTies(player) {
    this.database.ref("players/" + player).child("ties").transaction(function(ties) {
      return (ties || 0) + 1;
    });
  },

  playerLosses(player) {
    this.database.ref("players/" + player).child("losses").transaction(function(losses) {
      return (losses || 0) + 1;
    });
  }
};