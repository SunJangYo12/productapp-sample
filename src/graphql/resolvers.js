var data = require("../../restData")();

module.exports = {
  products: () => data.products,

  product: ({id}) => data.products.find(p =>
    p.id === parseInt(id)
  ),

  suppliers: () => data.suppliers.map(s => ({
      ...s,
      products: () => s.products.map(id =>
        data.products.find(p => p.id === Number(id))
      )
    })
  ),

  supplier: ({id}) =>
  {
    const result = data.suppliers.find(s =>
      s.id === parseInt(id)
    );

    if (result) {
      return {
        ...result,
        products: () =>
          result.products.map(id =>
            data.products.find(p =>
              p.id === Number(id)
            )
          )
      }
    }
  }
}