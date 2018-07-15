import React, { Component } from 'react';
import './App.css';
import Timer from './Timer.js';
import Preferences from './Preferences.js';
import Footer from './Footer.js';
import Controls from './Controls.js';
import SessionCounter from './SessionCounter.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Preferences />
        <h4>POMODORO TIMER</h4>
        <Timer />
        <Controls />
        <SessionCounter />
        <Footer />
      </div>
    );
  }
}

export default App;
