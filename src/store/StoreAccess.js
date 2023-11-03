import React, { Component } from "react";

export class StoreAccess extends Component
{
  constructor(props) {
    super(props);
    this.selectors = {
      product: (storeState) => storeState.modelData.products[0],
      state: (storeState) => storeState.stateData
    }
    this.state = this.selectData();
  }

  render() {
    return <div className="bg-info">
      <pre className="text-white">
        {
          JSON.stringify(this.state, null, 2)
        }
      </pre>
    </div>
  }

  selectData() {
    let storeState = this.props.store.getState();

    return Object.entries(this.selectors)
      .map(
        ([k, v]) => [k, v(storeState)]
      )
      .reduce(
        (result, [k, v]) => ({ ...result, [k]: v}), {}
      );
  }

  handleDataStoreChange() {
    let newData = this.selectData();

    Object.keys(this.selectors)
          .filter(key => this.state[key] !== newData[key])
          .forEach(key => this.setState({
              [key]: newData[key]
            })
          )
  }

  componentDidMount() {
    this.unsubscriber = this.props.store.subscribe( () =>
      this.handleDataStoreChange()
    );
  }

  componentWillUnmount() {
    this.unsubscriber();
  }
}