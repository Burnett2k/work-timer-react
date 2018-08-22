import React, { Component } from 'react';
import './App.css';
import CountdownTimer from '../containers/CountdownTimer.js';
import Footer from './Footer.js';
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
    default:
      break;
  }
}

document.addEventListener('keyup', handleKeyUp);

class App extends Component {

render() {
  return (
    <div className='container q-top-buffer'>
      <SavePreferences />
      <CountdownTimer />
    <Footer />
    </div>
  );
}
}

export default App;
