var miUid = "2";
document.addEventListener("DOMContentLoaded", () => {
  const game = document.getElementById("game");
  var turnoDe = document.getElementById("turnoDe");
  reset();

  function jugar(e) {
    var posicionCol = Math.floor(e.target.dataset.cf / 10);
    var posicionFila = 6 - libres[posicionCol - 1];
    var posicion = posicionCol * 10 + posicionFila;
    //console.log(posicion);
    quien = jugador > 0 ? "j1" : "j2";
    document.querySelector(`div[data-cf='${posicion}']`).classList.add(quien);
    libres[posicionCol - 1]--;
    jugador = jugador * -1;
    checkWinner(quien);
    var proximo = quien != "j1" ? "j1" : "j2";
    turnoDe.innerHTML = proximo;
    console.log(proximo);
    turnoDe.classList.remove(quien);
    turnoDe.classList.add(proximo);
    console.log(turnoDe);
  }
  function ganador() {
    console.log("capo!");
    ganadoras.forEach((g) => g.classList.add("ganadora"));
  }
  function checkWinner(quien) {
    var check = quien + quien + quien + quien;
    contador = "";

    //horizontales
    ganadoras = [];
    for (var f = 1; f < 6; f++) {
      var contador = "";
      for (var c = 1; c < 8; c++) {
        posicion = document.querySelector(`div[data-cf='${c * 10 + f}']`);
        if (posicion.classList.contains(quien)) {
          contador += quien;
          ganadoras.push(posicion);
        } else {
          contador = "";
          ganadoras = [];
        }
        if (contador == check) {
          ganador(quien);
        }
      }
    }
    //verticales
    ganadoras = [];
    for (var c = 1; c < 8; c++) {
      var contador = "";
      for (var f = 1; f < 6; f++) {
        posicion = document.querySelector(`div[data-cf='${c * 10 + f}']`);
        if (posicion.classList.contains(quien)) {
          contador += quien;
          ganadoras.push(posicion);
        } else {
          contador = "";
        }
        if (contador == check) {
          ganador(quien);
        }
      }
    }
    //diagonales x=y
    ganadoras = [];
    var inicios = [
      { c: 1, f: 2 },
      { c: 1, f: 1 },
      { c: 2, f: 1 },
      { c: 3, f: 1 },
      { c: 4, f: 1 },
    ];
    inicios.forEach((inicio) => {
      c = inicio.c;
      f = inicio.f;
      contador = "";
      for (i = 0; i < 4; i++) {
        posicion = document.querySelector(
          `div[data-cf='${(c + i) * 10 + f + i}']`
        );
        if (posicion.classList.contains(quien)) {
          contador += quien;
          ganadoras.push(posicion);
        } else {
          contador = "";
        }
        if (contador == check) {
          ganador(quien);
        }
      }
    });

    //diagonales patras
    ganadoras = [];
    var inicios = [
      { c: 7, f: 2 },
      { c: 7, f: 1 },
      { c: 6, f: 1 },
      { c: 5, f: 1 },
      { c: 4, f: 1 },
    ];
    inicios.forEach((inicio) => {
      c = inicio.c;
      f = inicio.f;
      contador = "";
      ganadoras = [];
      for (i = 0; i < 4; i++) {
        posicion = document.querySelector(
          `div[data-cf='${(c - i) * 10 + f + i}']`
        );
        if (posicion.classList.contains(quien)) {
          contador += quien;
          ganadoras.push(posicion);
        } else {
          contador = "";
        }
        if (contador == check) {
          ganador(quien);
        }
      }
    });
  }

  function armarTablero() {
    tableroArray = [];
    for (f = 5; f > 0; f--) {
      for (c = 1; c <= 7; c++) {
        var casilla = document.createElement("div");
        casilla.classList.add("casilla");
        casilla.addEventListener("click", function (event) {
          jugar(event);
        });
        casilla.setAttribute("data-cf", `${c}${f}`);
        //casilla.innerHTML = `cf=${c}${f}`;
        game.appendChild(casilla);
        tableroArray.push(c * 10 + f);
      }
    }
  }
  function uid() {
    console.log(miUid);
  }

  function reset() {
    libres = [5, 5, 5, 5, 5, 5, 5];
    jugador = 1;
    tableroArray = [];
    quien = "j1";
    ganadoras = [];
    document.getElementById("uid").addEventListener("click", function (e) {
      uid();
    });
  }
  function uid() {
    console.log(miUid);
  }
  armarTablero();
});
