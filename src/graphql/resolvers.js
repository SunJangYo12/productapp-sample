var data = require("../../restData")();

module.exports = {
  products: () => data.products,
  suppliers: () => data.suppliers
}