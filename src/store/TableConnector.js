import { connect } from "react-redux";
import { deleteProduct, deleteSupplier } from "./modelActionCreators";
import { PRODUCTS, SUPPLIERS } from "./dataTypes";
import { withRouter } from "react-router-dom";
import { getData } from "../graphql/GraphQLMiddleware";
import { DataGetter } from "../DataGetter";

export const TableConnector = (dataType, presentationComponent) =>
{
  const mapStateToProps = (storeData) => 
  {
    if (dataType === PRODUCTS)
    {
      return {
        products: storeData.modelData[PRODUCTS]
      }
    }
    else {
      return {
        suppliers: storeData.modelData[SUPPLIERS]
      };
    }
  }

  const mapDispatchToProps = (dispatch, ownProps) =>
  {
    return {
      getData: (type) => dispatch(getData(type)),
      deleteCallback: dataType === PRODUCTS ?
        (...args) => dispatch(deleteProduct(...args)) :
        (...args) => dispatch(deleteSupplier(...args))
    }
  }

  const mergeProps = (dataProps, functionProps, ownProps) =>
  {
    let routedDispatchers = {
      editCallback: (target) => {
        ownProps.history.push(`/${dataType}/edit/${target.id}`);
      },
      deleteCallback: functionProps.deleteCallback,
      getData: functionProps.getData
    }

    return Object.assign(
      {},
      dataProps,
      routedDispatchers,
      ownProps
    );
  }

  return withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
      mergeProps
    )
    (DataGetter(dataType, presentationComponent))
  );
}