import React from 'react';
import axios from 'axios';

const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4;

export default class AppClass extends React.Component {
  state = {
    message: initialMessage,
    email: initialEmail,
    index: initialIndex,
    steps: initialSteps,
  };

  getXY = () => {
    const { index } = this.state;
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    return { x, y };
  };

  getXYMessage = () => {
    const { x, y } = this.getXY();
    return `Coordinates (${x}, ${y})`;
  };

  reset = () => {
    this.setState({
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
    });
  };

  getNextIndex = (direction) => {
    const { index } = this.state;
    let nextIndex = index;

    switch (direction) {
      case 'left':
        if (index % 3 !== 0) {
          nextIndex = index - 1;
        }
        break;
      case 'up':
        if (index >= 3) {
          nextIndex = index - 3;
        }
        break;
      case 'right':
        if (index % 3 !== 2) {
          nextIndex = index + 1;
        }
        break;
      case 'down':
        if (index <= 5) {
          nextIndex = index + 3;
        }
        break;
      default:
        break;
    }

    return nextIndex;
  };

  move = (evt) => {
    const direction = evt.target.id;
    const nextIndex = this.getNextIndex(direction);
    const { steps } = this.state;

    if (nextIndex !== this.state.index) {
      this.setState({
        index: nextIndex,
        steps: steps + 1,
        message: '',
      });
    } else {
      this.setState({
        message: `You can't go ${direction}`,
      });
    }
  };

  onSubmit = async (evt) => {
    evt.preventDefault();
    const { index, email, steps } = this.state;

    try {
      const { x, y } = this.getXY();
      const response = await axios.post('http://localhost:9000/api/result', {
        x,
        y,
        steps,
        email,
      });

     
      if(response.data && response.data.message) {
        this.setState({ message: response.data.message, email: initialEmail }); // <-- clear email here
      } else {
        this.setState({ message: 'Submitted successfully!', email: initialEmail }); // <-- and here
      }

    } catch (error) {
      if (error.response) {
        this.setState({ message: error.response.data.message });
      } else {
        this.setState({ message: 'An error occurred. Please try again later.' });
      }
    }
};



  onChange = (evt) => {
    this.setState({ email: evt.target.value });
  };

  render() {
    const { message, email } = this.state;

    return (
      <div id="wrapper" className={this.props.className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div
              key={idx}
              className={`square${idx === this.state.index ? ' active' : ''}`}
            >
              {idx === this.state.index ? 'B' : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>
            LEFT
          </button>
          <button id="up" onClick={this.move}>
            UP
          </button>
          <button id="right" onClick={this.move}>
            RIGHT
          </button>
          <button id="down" onClick={this.move}>
            DOWN
          </button>
          <button id="reset" onClick={this.reset}>
            reset
          </button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            id="email"
            type="email"
            placeholder="type email"
            value={email}
            onChange={this.onChange}
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
