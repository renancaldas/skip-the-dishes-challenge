export default class Store {
  constructor(data) {
    this.id = data.id ? data.id : 0;
    this.name = data.name ? data.name : null;
    this.address = data.address ? data.address : null;
    this.cousineId = data.cousineId ? data.cousineId : null;
  }
}