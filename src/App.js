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
      <div className='container q-top-buffer'>
        <Preferences />
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
