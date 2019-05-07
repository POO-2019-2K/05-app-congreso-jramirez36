import Impresor from "./Impresor.js";
import Invocador from "./Invocador.js";

class Main {
  constructor() {
    let taller = new Impresor(
      document.querySelector("#Taller"),
      document.querySelector("#info")
    );

    document.querySelector("#btnAdd").addEventListener("click", () => {
      let form = document.querySelector("#form");

      if (form.checkValidity() === true) {
        let nameTaller = document.querySelector("#nameTaller").value;
        let name = document.querySelector("#name").value;
        let email = document.querySelector("#email").value;
        let nacimiento = document.querySelector("#nacimiento").value;
        nacimiento = nacimiento.split("-");
        let Fnacimiento = new Date(nacimiento[0], nacimiento[1] - 1, nacimiento[2]);

        let objParticipantes = {
          nameTaller = nameTaller,
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

let m = new Main();
