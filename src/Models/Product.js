export default class Product {
  constructor(data) {
    this.id = data.id ? data.id : 0;
    this.storeId = data.storeId ? data.storeId : 0;
    this.name = data.name ? data.name : 0;
    this.description = data.description ? data.description : 0;
    this.price = data.price ? data.price : 0;
  }
}