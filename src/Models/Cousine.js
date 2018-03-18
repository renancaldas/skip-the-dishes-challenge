export default class Cousine {
  constructor(data) {
    this.id = data.id ? data.id : 0;
    this.name = data.name ? data.name : null;
  }
}