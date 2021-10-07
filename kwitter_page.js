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
    room_name = localStorage.getItem("room_name");

function send(){

      message = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({

            name : user_name,
            message : message,
            likes : 0
      });
      document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
         console.log("message_id = " + firebase_message_id);
         console.log("message_data = " + message_data);
         name = message_data['name'];
         message = message_data['message'];
         likes = message_data['likes'];
         name_with_tag = "<h4>" + name + "<img src = 'tick.png' class = 'user_tick'></h4>";
         message_with_tag = "<h4 class = 'message_h4'>" + message + "</h4>";
         like_button = "<button class = 'btn btn-warning' id = " + firebase_message_id + " value = " + likes + " onclick = update_likes(this.id)>";
         button_text = "<span class = 'glyphicon glyphicon-thumbs-up'>Likes :  " + likes + "</span></button>";
         row = name_with_tag + message_with_tag + like_button + button_text;
         document.getElementById("output").innerHTML += row;
      } });  }); }
getData();

function update_likes(message_id){

likes = document.getElementById(message_id).value;
updated_likes = Number(likes)  + 1;

firebase.database().ref(room_name).child(message_id).update({

      likes : updated_likes
}); 
}

function logout(){

      localStorage.removeItem("username");
      localStorage.removeItem("room_name");
      window.location = "index.html";
    }
