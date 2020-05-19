var user = "";
var email = "";
var password = "";

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
