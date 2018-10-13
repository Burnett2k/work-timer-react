import React, { Component } from "react";
import "./App.css";
import CountdownTimer from "../containers/CountdownTimer.js";
import Footer from "./Footer.js";
import SavePreferences from "../containers/SavePreferences.js";
import SaveGoals from "../containers/SaveGoals";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      playPause: false,
      stop: false,
      reset: false,
      isEditMode: false
    };

    this.toggleModalShown = this.toggleModalShown.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  toggleModalShown() {
    if (!this.state.isEditMode) {
      this.setState(prevState => ({
        showModal: !prevState.showModal
      }));
    }
  }

  togglePlayPause() {
    if (!this.state.isEditMode) {
      this.setState(prevState => ({
        playPause: !prevState.playPause
      }));
    }
  }

  toggleStop() {
    if (!this.state.isEditMode) {
      this.setState(prevState => ({
        stop: !prevState.stop
      }));
    }
  }

  toggleReset() {
    if (!this.state.isEditMode) {
      this.setState(prevState => ({
        reset: !prevState.reset
      }));
    }
  }

  toggleEditMode() {
    this.setState(prevState => ({
      isEditMode: !prevState.isEditMode
    }));
  }

  handleKeyUp(event) {
    switch (event.key) {
      case "f":
        this.togglePlayPause();
        break;
      case "p":
        this.toggleModalShown();
        break;
      case "r":
        this.toggleReset();
        break;
      case "s":
        this.toggleStop();
        break;
      case "e":
        this.toggleEditMode();
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="container q-top-buffer">
        <SavePreferences
          toggleModalShown={this.toggleModalShown}
          showModal={this.state.showModal}
        />
        <CountdownTimer
          playPause={this.state.playPause}
          stop={this.state.stop}
          reset={this.state.reset}
        />
        <SaveGoals
          isEditMode={this.state.isEditMode}
          toggleEditMode={this.toggleEditMode}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
