import React, { Component } from 'react';
import './App.css';
import Timer from './Timer.js';
import Footer from './Footer.js';
import Controls from './Controls.js';
import SessionCounter from './SessionCounter.js';
import SavePreferences  from '../containers/SavePreferences.js';

const handleKeyUp = event => {
  switch(event.key) {
    case 'f':
      console.log("pressed f");
      break;
    case 'p':
      console.log("pressed p");
      break;
    case 'r':
      console.log("pressed r");
      break;
    case 's':
      console.log("pressed s");
      break;
  }
}

document.addEventListener('keyup', handleKeyUp);

class App extends Component {

  render() {
    return (
      <div className='container q-top-buffer'>
        <SavePreferences />
        <div className="container text-center q-top-buffer">
          <h4>POMODORO TIMER</h4>
          <Timer />
          <Controls />
          <SessionCounter />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
