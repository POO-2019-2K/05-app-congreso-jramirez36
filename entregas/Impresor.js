import Invocador from "./Invocador.js";

export default class Impresor {
  constructor(tableParticipantes, tableInfo) {
    this._tableParticipantes = tableParticipantes;
    this._tableInfo = tableInfo;
    this._sumDays = 0;
    this._Disponibles = 0;
    this._Ocupados = 0;
    this._numParcipantes = 0;
    this._Parcipantes = [];
    this._initTables();
  }

  _initTables() {
    //localStorage.removeItem("Parcipantes")
    let lsParticipantes = JSON.parse(localStorage.getItem("Parcipantes"));
    if (lsParticipantes === null) {
      return;
    }
    lsParticipantes.forEach((t, index) => {
      t.nacimiento = new Date(t.nacimiento);
      this._addToTable(new Invocador(t));
    })
  }
  _addToTable(info) {
    //calculo de lugares
    this._Disponibles = Number(info.lugares);
    this._Disponibles = this._Disponibles - this._Ocupados;
    if (this._Disponibles === 0 )
    {
      Swal.fire({
        type: "error" ,
        title: "Error",
        text: "El Taller no tiene espacios disponibles"
      })
      return;
    }
    //tabla
    let row = this._tableParticipantes.insertRow(-1);
    let cellTaller = row.insertCell(0);
    let cellName = row.insertCell(1);
    let cellEmail = row.insertCell(2);
    let cellEdad = row.insertCell(3);
    row.insertCell(7);
    row.insertCell(8);
    cellTaller.innerHTML = info.taller;
    cellName.innerHTML = info.name;
    cellEmail.innerHTML = info.email;
    cellEdad.innerHTML = getAge();
    this._Ocupados++;
    this._numParcipantes++; // this._numParcipantes = this._numParcipantes + 1
    this._sumDays += getAge(); // this._sumDays = this._sumDays + info.getTime()

    this._tableInfo.rows[0].cells[1].innerHTML = this._numParcipantes;

    this._tableInfo.rows[1].cells[1].innerHTML =
      this._sumDays / this._numParcipantes;

    let objParticipantes = {
      taller: info.taller,
      name: info.name,
      email: info.email
    };
    this._Parcipantes.push(objParticipantes);
  }
  _findParticipante(name)
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

  addInvocador(info) {
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