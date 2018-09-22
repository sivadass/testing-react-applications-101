import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      error: false,
    };

    this.decrementCounter = this.decrementCounter.bind(this)
    this.incrementCounter = this.incrementCounter.bind(this)
  }

  decrementCounter() {
    if (this.state.counter === 0) {
      this.setState({ error: true });
    } else {
      this.setState({ counter: this.state.counter - 1 });
    }
  }

  incrementCounter() {
    if (this.state.error) {
      this.setState({ error: false });
    }
    this.setState({ counter: this.state.counter + 1 });
  }

  render() {
    
    const errorClass = this.state.error ? '' : 'hidden';

    return (
      <div data-test="component-app">
      <h1 data-test="counter-display">The counter is currently {this.state.counter}</h1>
      <div data-test="error-message" className={`error ${errorClass}`}>
        The counter cannot go below 0
      </div>
      <button
        data-test="increment-button"
        onClick={this.incrementCounter}
        >
        Increment counter
      </button>
      <button
        data-test="decrement-button"
        onClick={this.decrementCounter}
        >
        Decrement counter
      </button>
      </div>
    );
  }
}

export default App;