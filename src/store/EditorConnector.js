import { connect } from "react-redux";
import { PRODUCTS, SUPPLIERS } from "./dataTypes";
import { saveAndEndEditing } from "./multiActionCreators";
import { withRouter } from "react-router-dom";

export const EditorConnector = (dataType, presentationComponent) =>
{
  const mapStateToProps = (storeData, ownProps) => 
  {
    const mode = ownProps.match.params.mode;
    const id = Number(ownProps.match.params.id);

    return {
      editing: mode === "edit" || mode === "create",
      product: (storeData.modelData[PRODUCTS].find(p => p.id === id)) || {},
      supplier: (storeData.modelData[SUPPLIERS].find(s => s.id === id)) || {},
    }
  }

  const mapDispatchToProps = {
    saveCallback: (data) => 
      saveAndEndEditing(data, dataType)
  }

  const mergeProps = (dataProps, functionProps, ownProps) =>
  {
    let routeDispatchers = {
      cancelCallback: () =>
        ownProps.history.push(`/${dataType}`),
        saveCallback: (data) => {
          functionProps.saveCallback(data);
          ownProps.history.push(`/${dataType}`);
        }
    }
    return Object.assign({}, dataProps, routeDispatchers, ownProps);
  }

  return withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
      mergeProps
    )
    (presentationComponent)
  );
}