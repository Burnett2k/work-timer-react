import React, { Component } from 'react';
import './App.css';
import Timer from './Timer.js';
import Footer from './Footer.js';
import Controls from './Controls.js';
import SessionCounter from './SessionCounter.js';
import SavePreferences  from '../containers/SavePreferences.js';

//stubbing out the state variables I'll need to keep up with
// const json = {

//   "preferences": {
//     "minutes": 25,
//     "mute": true
//   },
//   "streak": {
//     "numCompleted": 0
//   },
//   "clockFace": {
//     "date": "1/1/2018",
//     "timeRemaining": 100,
//     "paused": false
//   }
// }

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
