import React, { Component } from 'react';
import ReactGA from 'react-ga';
import './App.css';
import CountdownTimer from '../containers/CountdownTimer.js';
import SavePreferences from '../containers/SavePreferences.js';
import SaveGoals from '../containers/SaveGoals';
import ProgressChart from '../components/ProgressChart';
import HistoryButton from './HistoryButton';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            playPause: false,
            stop: false,
            reset: false,
            isEditMode: false,
            isChartVisible: false
        };

        this.toggleModalShown = this.toggleModalShown.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.toggleChartVisible = this.toggleChartVisible.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
        ReactGA.initialize('UA-116653106-1');
        ReactGA.pageview(window.location.pathname + window.location.search);
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

    turnOnEditMode() {
        if (!this.state.isEditMode) {
            this.setState({ isEditMode: true });
        }
    }

    toggleEditMode() {
        this.setState(prevState => ({
            isEditMode: !prevState.isEditMode
        }));
    }

    toggleChartVisible() {
        if (!this.state.isEditMode) {
            this.setState(prevState => ({
                isChartVisible: !prevState.isChartVisible
            }));
        }
    }

    handleKeyUp(event) {
        switch (event.key) {
            case 'f':
                this.togglePlayPause();
                break;
            case 'h':
                this.toggleChartVisible();
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
            case 'e':
                this.turnOnEditMode();
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="container q-top-buffer">
                    <div className="container d-flex flex-row-reverse">
                        <SavePreferences
                            toggleModalShown={this.toggleModalShown}
                            showModal={this.state.showModal}
                        />
                        &nbsp;
                        <HistoryButton
                            toggleChartVisible={this.toggleChartVisible}
                            isChartVisible={this.state.isChartVisible}
                        />
                    </div>

                    {this.state.isChartVisible ? (
                        <ProgressChart />
                    ) : (
                        <React.Fragment>
                            <CountdownTimer
                                playPause={this.state.playPause}
                                stop={this.state.stop}
                                reset={this.state.reset}
                            />
                            <SaveGoals
                                isEditMode={this.state.isEditMode}
                                toggleEditMode={this.toggleEditMode}
                            />
                        </React.Fragment>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default App;
