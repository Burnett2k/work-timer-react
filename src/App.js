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

const customStyles = {
  content : {
    top                   : '30%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    padding               : '10px',
    width                 : '350px'
  }
};


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
      <div className='container q-top-buffer'>
        <Preferences onClick={this.handleOpenModal}/>
        <div className="container text-center q-top-buffer">
          <h4>POMODORO TIMER</h4>
          <Timer />
          <Controls />
          <SessionCounter />
        </div>
        <Footer />
        <ReactModal
            isOpen={this.state.showModal}
            onRequestClose={this.handleCloseModal}
            style={customStyles}  
        >
            <PreferencesModal />
        </ReactModal>
      </div>
    );
  }
}

export default App;
