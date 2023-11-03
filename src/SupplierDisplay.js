import React, { Component } from "react";
import { SupplierEditor } from "./SupplierEditor";
import { SupplierTable } from "./SupplierTable";
import { connect } from "react-redux";
import { startCreatingSupplier } from "./store/stateActions";
import { SUPPLIERS } from "./store/dataTypes";
import { EditorConnector } from "./store/EditorConnector";
import { TableConnector } from "./store/TableConnector";

const ConnectEditor = EditorConnector(SUPPLIERS, SupplierEditor);
const ConnectTable = TableConnector(SUPPLIERS, SupplierTable);

const mapStateToProps = (storeData) => ({
  editing: storeData.stateData.editing,
  selected: storeData.modelData.suppliers.find(item => item.id === storeData.stateData.selectedId) || {}
})

const mapDispatchToProps = {
  createSupplier: startCreatingSupplier
}

const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export const SupplierDisplay = connectFunction(class extends Component
{
  render() {
    if (this.props.editing)
    {
      return <ConnectEditor key={this.props.selected.id || -1}/>
    }
    else {
      return <div className="m-2">
        <ConnectTable/>
        <div className="text-center">
          <button
            className="btn btn-primary m-1"
            onClick={this.props.createSupplier}>
              Create Supplier
          </button>
        </div>
      </div>
    }
  }
})