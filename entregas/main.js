import Taller from "./Taller.js";
import Fechas from "./Fechas.js";

class Main {
  constructor() {
    let taller = new Taller(
      document.querySelector("#Taller"),
      document.querySelector("#info")
    );

    document.querySelector("#btnAdd").addEventListener("click", () => {
      let form = document.querySelector("#form");

      if (form.checkValidity() === true) {
        let name = document.querySelector("#name").value;
        let lugares = document.querySelector("#lugares").value;
        let inicio = document.querySelector("#inicio").value;
        inicio = inicio.split("-");
        let iniciofinal = new Date(inicio[0], inicio[1] - 1, inicio[2]);
        let termino = document.querySelector("#termino").value;
        termino = termino.split("-");
        let terminofinal = new Date(termino[0], termino[1] - 1, termino[2]);
        let horas = document.querySelector("#horas").value;

        let objTalleres = {
          name: name,
          lugares: lugares,
          inicio: iniciofinal,
          termino: terminofinal,
          horas: horas
        };

        let info = new Fechas(objTalleres);

        taller.addFechas(info);
      }

      form.classList.add("was-validated");
    });
  }
}

let m = new Main();
