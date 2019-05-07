export default class Invocador {
  constructor(info) {
    this._name = info.name.toUpperCase();
    this._email = info.email;
    this._nacimiento = info.nacimiento;

    this._nacimiento = new Date(info.nacimiento);
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

  get email() {
    return this._email;
  }
  get nacimiento() {
    return this._nacimiento;
  }

  _getNumberAs2Digits(number){
    if(number < 10)
    {
      return "0"+ number;
    }
    return number;
  }

  getNacimientoForDate(){ 
    let {nacimiento} = this;
    let date = nacimiento.getFullYear() + "-" + this._getNumberAs2Digits(nacimiento.getMonth()+1) + "-" + this._getNumberAs2Digits(nacimiento.getDate()+1);
    return date;
  }

  getNacimientoAsString() {
    let date =
      (this._nacimiento.getDate()+1) +
      "/" +
      this._months[this._nacimiento.getMonth()] +
      "/" +
      this._nacimiento.getFullYear();
    return date;
  }

  getAge() {
    let oneDay = 24 * 60 * 60 * 1000;
    let oneYear = oneDay * 365;
    let differenceMs = new Date() - this._birthday;
    let age = Math.trunc(differenceMs / oneYear);
    return age;
  }
}
