var firebaseConfig = {
  apiKey: "AIzaSyAREI2qKos-lrrZwiSUzAncpbS6CNZVJjs",
  authDomain: "kwitter-ce60b.firebaseapp.com",
  databaseURL: "https://kwitter-ce60b-default-rtdb.firebaseio.com",
  projectId: "kwitter-ce60b",
  storageBucket: "kwitter-ce60b.appspot.com",
  messagingSenderId: "620769373370",
  appId: "1:620769373370:web:525a0513dd24145b55a683"
};

firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("username");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + " !!";

function addroom(){

  room_name = document.getElementById("room_name").value;
  firebase.database().ref("/").child(room_name).update({
    purpose : "adding user"
  });
  window.location = "kwitter_page.html";
   
  }



function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      console.log("room name - " + Room_names);
      console.log("get_data");
      row = "<div class = 'room_name' id = " + Room_names + " onclick = 'redirecttoroomname(this.id)' > # " + Room_names + "</div> <hr>";
      document.getElementById("output").innerHTML += row;
      console.log(row);
    });
  });
}

getData();

function redirecttoroomname(room_name){
  console.log("redirect");
  console.log(room_name);
  localStorage.setItem("room_name" , room_name);
  window.location = "kwitter_page.html";
}

function logout(){

  localStorage.removeItem("username");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}