import Fechas from "./Fechas.js";

export default class Taller {
  constructor(tableTaller, tableInfo) {
    this._tableTaller = tableTaller;
    this._tableInfo = tableInfo;
    this._numtalleres = 0;
    this._sumDays = 0;
    this._Disponibles = 0;
    this._Ocupados = 0;
    this._Talleres = [];

    this._initTables();
  }

  _initTables() {
    //localStorage.removeItem("Talleres")
    let lsTalleres = JSON.parse(localStorage.getItem("Talleres"));
    if (lsTalleres === null) {
      return;
    }
    lsTalleres.forEach((t, index) => {
      t.inicio = new Date(t.inicio);
      t.termino = new Date(t.termino);
      this._addToTable(new Fechas(t));
    })
  }
  _addToTable(info) {
    //calculo de lugares
    this._Disponibles = Number(info.lugares);
    this._Ocupados = info.lugares - this._Disponibles;
    //tabla
    let row = this._tableTaller.insertRow(-1);
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
    this._numtalleres++; // this._numtalleres = this._numtalleres + 1
    this._sumDays += info.getTime(); // this._sumDays = this._sumDays + info.getTime()

    this._tableInfo.rows[0].cells[1].innerHTML = this._numtalleres;

    this._tableInfo.rows[1].cells[1].innerHTML =
      this._sumDays / this._numtalleres;

    let objTalleres = {
      name: info.name,
      inicio: info.inicio,
      termino: info.termino,
      lugares: info.lugares,
      horas: info.horas
    };
    this._Talleres.push(objTalleres);
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
    localStorage.setItem("Talleres", JSON.stringify(this._Talleres));
  }
}