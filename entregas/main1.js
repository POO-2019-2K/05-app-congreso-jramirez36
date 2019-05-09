import Impresor from "./Impresor.js";
import Invocador from "./Invocador.js";

class Main1 {
  constructor() {
    let taller = new Impresor(
      document.querySelector("#Taller"),
      document.querySelector("#info")
    );

    document.querySelector("#btnAdd2").addEventListener("click", () => {
      let form = document.querySelector("#form");

      if (form.checkValidity() === true) {
        let name = document.querySelector("#name").value;
        let email = document.querySelector("#correo").value;
        let nacimiento = document.querySelector("#nacimiento").value;
        nacimiento = nacimiento.split("-");
        let Fnacimiento = new Date(nacimiento[0], nacimiento[1] - 1, nacimiento[2]);

        let objParticipantes = {
          name: name,
          email: email,
          nacimiento: Fnacimiento
        };

        let info = new Invocador(objParticipantes);

        taller.addInvocador(info);
      }

      form.classList.add("was-validated");
    });
  }
}

let m = new Main1();
