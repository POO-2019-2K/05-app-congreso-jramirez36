import Invocador from "./Invocador.js";

export default class Impresor {
  constructor(tableParticipantes, tableInfo) {
    this._tableParticipantes = tableParticipantes;
    this._tableInfo = tableInfo;
    this._numtalleres = 0;
    this._sumDays = 0;
    this._Disponibles = 0;
    this._Ocupados = 0;
    this._Parcipantes = [];

    this._initTables();
  }

  _initTables() {
    //localStorage.removeItem("Parcipantes")
    let lsTalleres = JSON.parse(localStorage.getItem("Parcipantes"));
    if (lsTalleres === null) {
      return;
    }
    lsTalleres.forEach((t, index) => {
      t.inicio = new Date(t.inicio);
      t.termino = new Date(t.termino);
      this._addToTable(new Invocador(t));
    })
  }
  _addToTable(info) {
    //calculo de lugares
    this._Disponibles = Number(info.lugares);
    this._Ocupados = info.lugares - this._Disponibles;
    //tabla
    let row = this._tableParticipantes.insertRow(-1);
    let cellName = row.insertCell(0);
    let cellInicio = row.insertCell(1);
    let cellTermino = row.insertCell(2);
    let cellDias = row.insertCell(3);
    let cellLugaresDisponibles = row.insertCell(4);
    let cellLugaresOcupados = row.insertCell(5);
    let cellHoras = row.insertCell(6);
    row.insertCell(7);
    row.insertCell(8);
    cellName.innerHTML = info.name;
    cellInicio.innerHTML = info.getInicioAsString();
    cellTermino.innerHTML = info.getTerminoAsString();
    cellDias.innerHTML = info.getTime();
    cellLugaresDisponibles.innerHTML = this._Disponibles;
    cellLugaresOcupados.innerHTML = this._Ocupados;
    cellHoras.innerHTML = info.horas;
    this._numParcipantes++; // this._numParcipantes = this._numParcipantes + 1
    this._sumDays += info.getTime(); // this._sumDays = this._sumDays + info.getTime()

    this._tableInfo.rows[0].cells[1].innerHTML = this._numParcipantes;

    this._tableInfo.rows[1].cells[1].innerHTML =
      this._sumDays / this._numParcipantes;

    let objTalleres = {
      name: info.name,
      inicio: info.inicio,
      termino: info.termino,
      lugares: info.lugares,
      horas: info.horas
    };
    this._Parcipantes.push(objTalleres);
  }
  _findTaller(name)
  {
    let foundAt = -1;
    this._Talleres.forEach((t, index) => {
      if (t.name === name)
      {
        foundAt = index;
        return;
      }
    })
    return foundAt;
  }

  addFechas(info) {
    let found = this._findTaller(info.name)
    if(found >= 0)
    {
      Swal.fire({
        type: "error" ,
        title: "Error",
        text: "El usuario ya existe"
      })
      return;
    }
    this._addToTable(info);
    localStorage.setItem("Parcipantes", JSON.stringify(this._Parcipantes));
  }
}