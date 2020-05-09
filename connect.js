document.addEventListener("DOMContentLoaded", () => {
  const game = document.getElementById("game");
  var tablero = document.createElement("div");
  var libres = [5, 5, 5, 5, 5, 5, 5];
  var jugador = 1;
  var tableroArray = [];

  function jugar(e) {
    var posicionCol = Math.floor(e.target.dataset.cf / 10);
    var posicionFila = 6 - libres[posicionCol - 1];
    var posicion = posicionCol * 10 + posicionFila;
    console.log(posicion);
    var quien = jugador > 0 ? "j1" : "j2";
    document.querySelector(`div[data-cf='${posicion}']`).classList.add(quien);
    libres[posicionCol - 1]--;
    jugador = jugador * -1;
  }

  function armarTablero() {
    tableroArray = [];
    for (f = 5; f > 0; f--) {
      for (c = 1; c <= 7; c++) {
        ////////////////////////////

        /* function createChild() {
    let myEle = document.createElement("span");
    myEle.innerHTML = "hello world";
    myEle.style.color = "blue";

    let wrapper = document.getElementById("wrapper");
    wrapper.appendChild(myEle);
 } */

        /////////////////////////

        var casilla = document.createElement("div");
        casilla.classList.add("casilla");
        casilla.addEventListener("click", function (event) {
          jugar(event);
        });
        casilla.setAttribute("data-cf", `${c}${f}`);

        casilla.innerHTML = `cf=${c}${f}`;

        game.appendChild(casilla);
        tableroArray.push(c * 10 + f);

        /*  tablero += `<div class="casilla" onclick="jugar()" data-c=${c} data-c=${c} >c${c} f${f}</div>`;
        tableroArray.push(c * 10 + f); */
      }
      //game.innerHTML = tablero;
    }
    console.log(tableroArray);
  }
  armarTablero();
  //game.innerHTML = `<div class="casilla">1</div>`;
});
