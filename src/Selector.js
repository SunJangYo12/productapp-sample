import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter, Prompt } from "react-router-dom";
import { ProductDisplay } from "./ProductDisplay";
import { SupplierDisplay } from "./SupplierDisplay";
import { RouteInfo } from "./routing/RouteInfo";
import { ToggleLink } from "./routing/ToggleLink";

const RouteInfoHOC = withRouter(RouteInfo);

export class Selector extends Component 
{
  renderMessage = (msg) =>
    <h5 className="bg-info text-white m-2 p-2">{ msg}</h5>

  render() {
    return <Router>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
           
              <ToggleLink
                className="m-2 btn btn-block btn-primary"
                activeClassName="active"
                to="/products">Products</ToggleLink>
            
              <ToggleLink
                className="m-2 btn btn-block btn-primary"
                activeClassName="active"
                to="/suppliers">Suppliers</ToggleLink>

              <ToggleLink
                className="m-2 btn btn-block btn-primary"
                activeClassName="active"
                to="/info">Route Info</ToggleLink>

              <ToggleLink
                className="m-2 btn btn-block btn-primary"
                activeClassName="active"
                to="/info/match">Match</ToggleLink>
              <ToggleLink
                className="m-2 btn btn-block btn-primary"
                activeClassName="active"
                to="/info/location">Location</ToggleLink>

              <ToggleLink
                className="m-2 btn btn-block btn-primary"
                activeClassName="active"
                to="/info">All Info</ToggleLink>
            
          </div>
          <div className="col">
            <Prompt
              message={ loc =>
                `Do you want to navigation to ${loc.pathname}`
              }
            />
            <RouteInfoHOC/>
            <Switch>
              <Route
                path="/products"
                component={ ProductDisplay }/>
              <Route
                path="/suppliers"
                component={ SupplierDisplay }/>
              <Route
                path="/info/:datatype?"
                component={ RouteInfo }/>

              <Redirect
                to="/products"/>
            </Switch>               
          </div>
        </div>
      </div>
    </Router>
  }
}
