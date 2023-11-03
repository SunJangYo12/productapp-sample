import { connect } from "react-redux";
import { startEditingProduct, startEditingSupplier } from "./stateActions";
import { deleteProduct, deleteSupplier } from "./modelActionCreators";
import { PRODUCTS, SUPPLIERS } from "./dataTypes";

export const TableConnector = (dataType, presentationComponent) =>
{
  const mapStateToProps = (storeData) => ({
    products: storeData.modelData[PRODUCTS],
    suppliers: storeData.modelData[SUPPLIERS],
  })

  const mapDispatchToProps = {
    editCallback: dataType === PRODUCTS ? startEditingProduct : startEditingSupplier,
    deleteCallback: dataType === PRODUCTS ? deleteProduct : deleteSupplier
  }

  return connect(mapStateToProps, mapDispatchToProps)(presentationComponent);
}