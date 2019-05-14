import Invocador from "./Invocador.js";
export default class Impresor {
  constructor(tableParticipantes, tableInfo) {
    this._tableParticipantes = tableParticipantes;
    this._tableInfo = tableInfo;
    this._nameTaller = 0;
    this._sumYears = 0;
    this._Disponibles = 0;
    this._Ocupados = 0;
    this._numParcipantes = 0;
    this._Parcipantes = [];
    this._initTables();
  }

  _initTables() {
    //localStorage.removeItem("Parcipantes")
    let taller = JSON.parse(localStorage.getItem("ID"));
    taller.forEach((t, index) => {
      this._nameTaller = t.taller;
      this._Disponibles = Number(t.lugares);
      
    })
    let lsParticipantes = JSON.parse(localStorage.getItem("Parcipantes"));
    if (lsParticipantes === null) {
      return;
    }
    lsParticipantes.forEach((p, index) => {
      console.log(p.taller);
      p.nacimiento = new Date(p.nacimiento);
      this._addToTable(new Invocador(p));
    })
  }
  _addToTable(info) {
    if(info.ocupados === undefined)
    {
      this._Ocupados = 0;
    }
    else
    {
      this._Ocupados = info.ocupados;
      return;
    }
    if(this._nameTaller === info.taller || this._Ocupados === 0 || info.taller === undefined )
    {
    //calculo de lugares
    this._Ocupados++;
    this._Disponibles = this._Disponibles - this._Ocupados;
    if(this._Disponibles <= 0)
    {
      Swal.fire({
        type: "error" ,
        title: "Error",
        text: "El taller no tiene espacios disponibles"
      })
      return;
    }
    else
    {

    }
    //tabla
    let row = this._tableParticipantes.insertRow(-1);
    let cellTaller = row.insertCell(0);
    let cellName = row.insertCell(1);
    let cellEmail = row.insertCell(2);
    let cellEdad = row.insertCell(3);
    row.insertCell(4);
    row.insertCell(5);
    cellTaller.innerHTML = this._nameTaller;
    cellName.innerHTML = info.name;
    cellEmail.innerHTML = info.email;
    cellEdad.innerHTML = info.getAge();
    this._numParcipantes++; // this._numParcipantes = this._numParcipantes + 1
    this._sumYears += info.getAge(); // this._sumDays = this._sumDays + info.getTime()

    this._tableInfo.rows[0].cells[1].innerHTML = this._numParcipantes;

    this._tableInfo.rows[1].cells[1].innerHTML = this._sumYears / this._numParcipantes;

    this._tableInfo.rows[2].cells[1].innerHTML = this._Disponibles;

    this._tableInfo.rows[3].cells[1].innerHTML = this._Ocupados;
    // nombre
    let objParticipantes = {
      taller: this._nameTaller,
      name: info.name,
      email: info.email,
      nacimiento: info.nacimiento,
      ocupados: this._Ocupados
    };
    
    this._Parcipantes.push(objParticipantes);
    
    }
    return;
  }
  _findParticipante(name)
  {
    let foundAt = -1;
    this._Parcipantes.forEach((p, index) => {
      if (p.name === name)
      {
        foundAt = index;
        return;
      }
    })
    return foundAt;
  }

  addInvocador(info) {
    let found = this._findParticipante(info.name)
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