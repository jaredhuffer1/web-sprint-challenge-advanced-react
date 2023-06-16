import React, { useState } from 'react';
import axios from 'axios';

const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4;

const AppFunctional = (props) => {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);

  const getXY = () => {
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    return { x, y };
  };

  const getXYMessage = () => {
    const { x, y } = getXY();
    return `Coordinates (${x}, ${y})`;
  };

  const reset = () => {
    setMessage(initialMessage);
    setEmail(initialEmail);
    setIndex(initialIndex);
    setSteps(initialSteps);
  };

  const getNextIndex = (direction) => {
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

  const move = (evt) => {
    const direction = evt.target.id;
    const nextIndex = getNextIndex(direction);
  
    if (nextIndex !== index) {
      setIndex(nextIndex);
      setSteps(steps + 1);
      setMessage('');
    } else {
      setMessage(`You can't go ${direction}`);
    }
  };
  

  const onChange = (evt) => {
    setEmail(evt.target.value);
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const { x, y } = getXY();
      await axios.post('http://localhost:9000/api/result', {
        x,
        y,
        steps,
        email,
      });
      setMessage('Submitted successfully!');
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            className={`square${idx === index ? ' active' : ''}`}
          >
            {idx === index ? 'B' : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>
          LEFT
        </button>
        <button id="up" onClick={move}>
          UP
        </button>
        <button id="right" onClick={move}>
          RIGHT
        </button>
        <button id="down" onClick={move}>
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          value={email}
          onChange={onChange}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
};

export default AppFunctional;
