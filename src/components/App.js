import React, { Component } from 'react';
import './App.css';
import CountdownTimer from '../containers/CountdownTimer.js';
import Footer from './Footer.js';
import SavePreferences  from '../containers/SavePreferences.js';

class App extends Component {

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      playPause: false,
      stop: false,
      reset: false
    }

    this.toggleModalShown = this.toggleModalShown.bind(this);
  }

  toggleModalShown() {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }

  togglePlayPause() {
    this.setState(prevState => ({
      playPause: !prevState.playPause
    }));
  }

  toggleStop() {
    this.setState(prevState => ({
      stop: !prevState.stop
    }));
  }

  toggleReset() {
    this.setState(prevState => ({
      reset: !prevState.reset
    }));
  }

  handleKeyUp(event) {
    switch(event.key) {
      case 'f':
        this.togglePlayPause();
        break;
      case 'p':
        this.toggleModalShown();
        break;
      case 'r':
        this.toggleReset();
        break;
      case 's':
        this.toggleStop();
        break;
      default:
        break;
    }
  }

render() {
  return (
    <div className='container q-top-buffer'>
      <SavePreferences 
        showModal={this.state.showModal}
      />
      <CountdownTimer 
        playPause={this.state.playPause}
        stop={this.state.stop}
        reset={this.state.reset}/>
      <Footer />
    </div>
    );
  }
}

export default App;
