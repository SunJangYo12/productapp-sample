var data = require("../../restData")();

const mapIdsToProducts = (supplier, nameFilter) =>
  supplier.products.map(id =>
    data.products.find(p =>
      p.id === Number(id)
    )
  )
  .filter(p =>
    p.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

module.exports = {
  products: () => data.products,

  product: ({id}) => data.products.find(p =>
    p.id === parseInt(id)
  ),

  suppliers: () => data.suppliers.map(s => ({
      ...s,
      products: ({nameFilter}) =>
        mapIdsToProducts(s, nameFilter)
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
        products: ({nameFilter}) =>
          mapIdsToProducts(result, nameFilter)
      }
    }
  }
}