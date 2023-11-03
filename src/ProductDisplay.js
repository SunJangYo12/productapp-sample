import React, { Component } from "react";
import { ProductTable } from "./ProductTable";
import { ProductEditor } from "./ProductEditor";
import { connect } from "react-redux";
import { EditorConnector } from "./store/EditorConnector";
import { PRODUCTS } from "./store/dataTypes";
import { TableConnector } from "./store/TableConnector";
import { startCreatingProduct } from "./store/stateActions"; 

const ConnectEditor = EditorConnector(PRODUCTS, ProductEditor);
const ConnectTable = TableConnector(PRODUCTS, ProductTable);


const mapStateToProps = (storeData) => ({
  editing: storeData.stateData.editing,
  selected: storeData.modelData.products.find(item => item.id === storeData.stateData.selectedId) || {}
})
const mapDispatchToProps = {
  createProduct: startCreatingProduct
}

const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export const ProductDisplay = connectFunction(class extends Component
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
            onClick={ this.props.createProduct }>
              Create Product    
          </button>
        </div>
      </div>
    }
  }
})