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
      showModal: false
    }

    this.toggleModalShown = this.toggleModalShown.bind(this);
  }

  toggleModalShown() {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }

  handleKeyUp(event) {
    switch(event.key) {
      case 'f':
        console.log("pressed f");
        break;
      case 'p':
        console.log("pressed p");
        this.toggleModalShown();
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

render() {
  return (
    <div className='container q-top-buffer'>
      <SavePreferences 
        showModal={this.state.showModal}
        toggleModalShown={this.toggleModalShown}
      />
      <CountdownTimer />
      <Footer />
    </div>
    );
  }
}

export default App;
