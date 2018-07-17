import React, { Component } from 'react';
import ReactModal from 'react-modal';
import './App.css';
import Timer from './Timer.js';
import Preferences from './Preferences.js';
import Footer from './Footer.js';
import Controls from './Controls.js';
import SessionCounter from './SessionCounter.js';
import PreferencesModal from './PreferencesModal.js';

ReactModal.setAppElement('#root');

class App extends Component {

  constructor () {
    super();
    this.state = {
      showModal: false
    }

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState( {showModal: false });
  }

  render() {
    return (
      <div>
        <Preferences onClick={this.handleOpenModal}/>
        <div className="container text-center">
          <h4>POMODORO TIMER</h4>
          <Timer />
          <Controls />
          <SessionCounter />
        </div>
        <Footer />
        <PreferencesModal />
      </div>
    );
  }
}

export default App;
