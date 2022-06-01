import React from 'react';

class EsClassComponent extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      count: 0,
    }
    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
  }

  handleIncrease() {
    this.setState(previousValue => ({
      count: previousValue.count + 1,
    }));
  }

  handleDecrease() {
    this.setState(previousValue => ({
      count: previousValue.count - 1,
    }));
  }

  handleReset() {
    this.setState(()=> ({
      count: 0,
    }));  }

  render() {
    return (
      <div className="es6-class-component">
        <h2>I'm ES6 Class Component</h2>
        <span>{this.state.count}</span>
        <div>
          <button onClick={this.handleIncrease}>+</button>
          <button onClick={this.handleDecrease}>-</button>
          <button onClick={this.handleReset}>Reset</button>
        </div>
      </div>
    )
  };
}

export default EsClassComponent;
