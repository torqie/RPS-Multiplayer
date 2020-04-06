const fb = {

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

  init() {
    firebase.initializeApp(this.firebaseConfig);
    this.database = firebase.database();
  },

};
fb.init();