import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { ProductDisplay } from "./ProductDisplay";
import { SupplierDisplay } from "./SupplierDisplay";

export class Selector extends Component 
{
  renderMessage = (msg) =>
    <h5 className="bg-info text-white m-2 p-2">{ msg}</h5>

  render() {
    return <Router>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <div>
              <Link to="/">Default</Link>
            </div>
            <div>
              <Link to="/products">Products</Link>
            </div>
            <div>
              <Link to="/suppliers">Suppliers</Link>
            </div>
          </div>
          <div className="col">
            <Switch>
              <Route
                path="/products"
                component={ ProductDisplay }/>
              <Route
                path="/suppliers"
                component={ SupplierDisplay }/>

              <Route
                render={
                  () =>
                    this.renderMessage("Fallback Route")
                }
              />
            </Switch>               
          </div>
        </div>
      </div>
    </Router>
  }
}
