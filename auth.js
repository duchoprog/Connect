var user = "";
var email = "";
var password = "";
var database = firebase.database();
var gameLists = document.getElementById("gameLists");

function logIn() {
  email = document.getElementById("mail").value;
  password = document.getElementById("pass").value;
  console.log(email, password);
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function (user) {
      miUid = user.user.uid;
      console.log(miUid);
    })
    .catch(function (error) {
      //document.getElementById("modalMsg").innerHTML = error.message;
      $("#myModal").modal({ keyboard: true });
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode === "auth/wrong-password") {
        alert("Wrong password.");
      } else {
        console.log(errorMessage);
      }
      console.log(error);
    });
}
function crear() {
  email = document.getElementById("mail").value;
  password = document.getElementById("pass").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function (user) {
      miUid = user.user.uid;
      console.log(miUid);
      writeUserData(miUid, email);
      email = "";
      password = "";
      console.log(user);
    })
    .catch(function (error) {
      document.getElementById("modalMsg").innerHTML = error.message;
      $("#myModal").modal({ keyboard: true });
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}

function writeUserData(userId, email) {
  firebase
    .database()
    .ref("users/" + userId)
    .set({
      email: email,
    });
}

function armarListas() {
  var lista = "";
  database
    .ref("dpconnect/games/")
    .once("value")
    .then(function (snap) {
      console.log(snap.val());
      snap.forEach((element) => {
        lista += `
        <tr><td>${element.key.slice(
          element.key.length - 4,
          element.key.length
        )}</td>
      <td>${element.val().j1}</td>
      <td>${element.val().j2}</td>
      <td>${element.val().ganador}</td></tr>`;

        console.log(lista);
      });
      document.getElementById("connectList").innerHTML += lista;
    });
}
armarListas();
/* var juegosInicial = [
  {
    j1: "123a",
    j2: "123b",
    estado: "terminado",
    ganador: "123a",
  },
  {
    j1: "123a",
    j2: "null",
    estado: "abierto",
    ganador: "null",
  },
  {
    j1: "123a",
    j2: "123b",
    estado: "encurso",
    ganador: "null",
  },
]; */
/* function basico() {
  for (i = 0; i < juegosInicial.length; i++) {
    firebase.database().ref("dpconnect/games/").push(juegosInicial[i]);
    console.log(juegosInicial[i]);
  }
}
basico(); */
