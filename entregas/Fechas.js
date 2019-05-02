export default class Fechas {
  constructor(info) {
    this._name = info.name.toUpperCase();
    this._lugares = info.lugares;
    this._inicio = info.inicio;
    this._termino = info.termino;
    this._horas = info.horas;

    this._inicio = new Date(info.inicio);
    this._termino = new Date(info.termino);
    this._months = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic"
    ];
    
  }

  get name() {
    return this._name;
  }

  get lugares() {
    return this._lugares;
  }
  get horas() {
    return this._horas;
  }
  get inicio() {
    return this._inicio;
  }
  get termino() {
    return this._termino;
  }

  _getNumberAs2Digits(number){
    if(number < 10)
    {
      return "0"+ number;
    }
    return number;
  }

  getInicioForDate(){ 
    let {inicio} = this;
    let date = inicio.getFullYear() + "-" + this._getNumberAs2Digits(inicio.getMonth()+1) + "-" + this._getNumberAs2Digits(inicio.getDate()+1);
    return date;
  }

  getInicioAsString() {
    let date =
      (this._inicio.getDate()+1) +
      "/" +
      this._months[this._inicio.getMonth()] +
      "/" +
      this._inicio.getFullYear();
    return date;
  }
  getTerminoForDate(){ 
    let {termino} = this;
    let date2 = termino.getFullYear() + "-" + this._getNumberAs2Digits(termino.getMonth()+1) + "-" + this._getNumberAs2Digits(termino.getDate()+1);
    return date2;
  }

  getTerminoAsString() {
    let date2 =
      (this._termino.getDate()+1) +
      "/" +
      this._months[this._termino.getMonth()] +
      "/" +
      this._termino.getFullYear();
    return date2;
  }

  getTime() {
    let oneDay = 24 * 60 * 60 * 1000;
    let differenceMs = this._termino - this._inicio;
    let time = Math.trunc(differenceMs / oneDay);
    return time;
  }
}
