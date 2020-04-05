const player = {

  firebaseConfig: {
    apiKey: "AIzaSyCvquFXBz1s5CfX5Q29gi91_L2pdXp3mGI",
    authDomain: "thone-b04dc.firebaseapp.com",
    databaseURL: "https://thone-b04dc.firebaseio.com",
    projectId: "thone-b04dc",
    storageBucket: "thone-b04dc.appspot.com",
    messagingSenderId: "556043671959",
    appId: "1:556043671959:web:17936ef0cd7adcf04e8cd2"
  },

  wins: 0,
  losses: 0,
  ties: 0,
  choice: null,
  database: null,


  init() {
    firebase.initializeApp(this.firebaseConfig);
    this.database = firebase.database();
  },

  setPlayer() {
    // Check if player1 Exists.. If so create player 2
    database.ref("player1").once("value").then(function (snapshot) {
      // Check if player1 exists.
      if(!snapshot.exists()) {
        // Doesnt exist, create player1
        database.ref("player1").push({

        });

      } else {
        // Does exist, create player2


      }
    });
  },

  createPlayer() {

  }




};

player.init();

player.init();