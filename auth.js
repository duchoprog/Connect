var user = "";
var email = "";
var password = "";
function logIn(email, password) {
  email = document.getElementById("mail").value;
  password = document.getElementById("pass").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function (user) {
      console.log(user);
    })
    .catch(function (error) {
      $("#myModal").modal();
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
