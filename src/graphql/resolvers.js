var data = require("../../restData")();

module.exports = {
  products: () => data.products,
  suppliers: () => data.suppliers.map(s => ({
      ...s,
      products: () => s.products.map(id =>
        data.products.find(p => p.id === Number(id))
      )
    })
  )
}