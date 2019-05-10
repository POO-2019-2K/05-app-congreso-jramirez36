import Fechas from "./Fechas.js";
export default class Taller {
  constructor(tableTaller, tableInfo) {
    this._tableTaller = tableTaller;
    this._tableInfo = tableInfo;
    this._numtalleres = 0;
    this._sumDays = 0;
    this._lugares = 0;
    this._Ocupados = 0;
    this._Talleres = [];
    this._ID = [];

    this._initTables();
  }

  _initTables() {
    //localStorage.removeItem("Talleres") 
    let lsParticipantes = JSON.parse(localStorage.getItem("Parcipantes"));
    if (lsParticipantes === null) {
      return;
    }
    lsParticipantes.forEach((p, index) => {
      this._Ocupados = Number(p.ocupados);
    })
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
  _addEditDeleteRowtotable(row, info){
    let btnEdit = document.createElement("input");
    btnEdit.type = "button";
    btnEdit.value = "Editar";
    btnEdit.className = "btn btn-success";
    btnEdit.addEventListener("click", () => {
      this._editRow(row, info);
    })

    let btnDelete = document.createElement("input");
    btnDelete.type = "button";
    btnDelete.value = "Eliminar";
    btnDelete.className = "btn btn-danger";
    
    let btnParticipantes = document.createElement("input");
    btnParticipantes.type = "button";
    btnParticipantes.value = "participantes";
    btnParticipantes.className = "btn btn-success";
    btnParticipantes.addEventListener("click", () => {
      this._limpiador();
      let nombretaller = 
    {
      taller: info.taller,
      lugares: info.lugares,
    };
      this._ID.push(nombretaller);
      localStorage.setItem("ID", JSON.stringify(this._ID));
      location.href='participantes.html';
    })

    row.cells[7].innerHTML = "";
    row.cells[7].appendChild(btnEdit);
    row.cells[8].innerHTML = "";
    row.cells[8].appendChild(btnDelete);
    row.cells[9].innerHtml = "";
    row.cells[9].appendChild(btnParticipantes);
  }
  _limpiador()
  {
    localStorage.removeItem("ID");
    console.log("ID");
  }
  _saveEdit(row, info, newparticipante)
  {
    let pos = this._findTaller(info.taller);
    this._Talleres[pos] = newparticipante;
    localStorage.setItem("Talleres", JSON.stringify(this._Talleres));
    this._cancelEdit(row, new Fechas(newparticipante));
  }

  _cancelEdit(row, info)
  {
    row.cells[0].innerHTML = "";
    row.cells[0].innerHTML = info.taller;
    row.cells[1].innerHTML = "";
    row.cells[1].innerHTML = info.getInicioAsString();
    row.cells[2].innerHTML = "";
    row.cells[2].innerHTML = info.getTerminoAsString();
    row.cells[3].innerHTML = "";
    row.cells[3].innerHTML = info.getTime();
    row.cells[4].innerHTML = "";
    row.cells[4].innerHTML = this._lugares;
    row.cells[5].innerHTML = "";
    row.cells[5].innerHTML = this._Ocupados;
    row.cells[6].innerHTML = "";
    row.cells[6].innerHTML = info.horas;

    this._addEditDeleteRowtotable(row, info);

  }
  _editRow(row, info)
  {
    let italler = document.createElement("input");
    italler.type = "text";
    italler.value = info.taller;
    row.cells[0].innerHTML = "";
    row.cells[0].appendChild(italler);

    let iInicio = document.createElement("input");
    iInicio.type = "date";
    iInicio.value = info.getInicioForDate();
    row.cells[1].innerHTML = "";
    row.cells[1].appendChild(iInicio);

    let iTermino = document.createElement("input");
    iTermino.type = "date";
    iTermino.value = info.getTerminoForDate(); 
    row.cells[2].innerHTML = "";
    row.cells[2].appendChild(iTermino);

    let iLugares = document.createElement("input");
    iLugares.type = "number";
    iLugares.value = this._lugares; 
    row.cells[4].innerHTML = "";
    row.cells[4].appendChild(iLugares);

    let iHoras = document.createElement("input");
    iHoras.type = "number";
    iHoras.value = info.horas; 
    row.cells[6].innerHTML = "";
    row.cells[6].appendChild(iHoras);

    let btnSave = document.createElement("input");
    btnSave.type = "button";
    btnSave.value = "Grabar";
    btnSave.className = "btn btn-success";
    row.cells[7].innerHTML = "";
    row.cells[7].appendChild(btnSave);
    btnSave.addEventListener("click", () => {
      
    let newparticipante = 
    {
      taller: italler.value,
      lugares: iLugares.value,
      inicio: iInicio.value,
      termino: iTermino.value,
      horas: iHoras.value,
    };
      this._saveEdit(row, info, newparticipante);
    })

    let btnCancel = document.createElement("input");
    btnCancel.type = "button";
    btnCancel.value = "Cancelar";
    btnCancel.className = "btn btn-danger";
    row.cells[8].innerHTML = "";
    row.cells[8].appendChild(btnCancel);
    btnCancel.addEventListener("click", () => {
      this._cancelEdit(row, info);
    })
    row.cells[9].innerHTML = "";
  }
  _addToTable(info) {
    //calculo de lugares
    this._lugares = Number(info.lugares);
    this._lugares = this._lugares - this._Ocupados;
    //tabla
    let row = this._tableTaller.insertRow(-1);
    let cellName = row.insertCell(0);
    let cellInicio = row.insertCell(1);
    let cellTermino = row.insertCell(2);
    let cellDias = row.insertCell(3);
    let cellLugares = row.insertCell(4);
    let cellocupados = row.insertCell(5);
    let cellHoras = row.insertCell(6);
    row.insertCell(7);
    row.insertCell(8);
    row.insertCell(9);
    cellName.innerHTML = info.taller;
    cellInicio.innerHTML = info.getInicioAsString();
    cellTermino.innerHTML = info.getTerminoAsString();
    cellDias.innerHTML = info.getTime();
    cellLugares.innerHTML = this._lugares;
    cellocupados.innerHTML = this._Ocupados;
    cellHoras.innerHTML = info.horas;
    this._addEditDeleteRowtotable(row, info); //botones
    this._numtalleres++; // this._numtalleres = this._numtalleres + 1
    this._sumDays += info.getTime(); // this._sumDays = this._sumDays + info.getTime()

    this._tableInfo.rows[0].cells[1].innerHTML = this._numtalleres;

    this._tableInfo.rows[1].cells[1].innerHTML =
      this._sumDays / this._numtalleres;

    let objTalleres = {
      taller: info.taller,
      inicio: info.inicio,
      termino: info.termino,
      lugares: info.lugares,
      horas: info.horas
    };
    this._Talleres.push(objTalleres);
  }
  _findTaller(taller)
  {
    let foundAt = -1;
    this._Talleres.forEach((t, index) => {
      if (t.taller === taller)
      {
        foundAt = index;
        return;
      }
    })
    return foundAt;
  }

  addFechas(info) {
    let found = this._findTaller(info.taller)
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