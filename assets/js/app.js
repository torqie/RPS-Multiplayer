const player = {

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
  playerOneRef: "/player1",
  playerTwoRef: "/player2",


  init() {
    firebase.initializeApp(this.firebaseConfig);
    this.database = firebase.database();
  },

  setPlayer(name) {
    // Check if player1 Exists.. If so create player 2
    this.database.ref(this.playerOneRef).once("value").then(function (snapshot) {

      const newPlayer = {
        player: null,
        name: name,
      };

      // Check if player1 exists.
      if(!snapshot.exists()) {
        newPlayer.player = "player1";
      } else {
        // Does exist, create player2
        newPlayer.player = "player2";
      }
      player.createPlayer(newPlayer);
    });
  },

  createPlayer(player) {
    this.database.ref("/" + player.player).set({
      name: player.name,
      wins: 0,
      losses: 0,
      ties: 0
    });
  }






};

player.init();

player.setPlayer("Terik");