import PropTypes from 'prop-types';

const React = require('react');
const pomodoroLink = 'https://en.wikipedia.org/wiki/Pomodoro_Technique';

class PreferencesModal extends React.Component {
    static propTypes = {
        minutes: PropTypes.number,
        isMuted: PropTypes.bool,
        theme: PropTypes.string,
        onPreferencesSaved: PropTypes.func,
        onRequestClose: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            minutes: this.props.minutes,
            isMuted: this.props.isMuted,
            theme: this.props.theme
        };

        this.enterPressed = this.enterPressed.bind(this);
        this.handleMinutesChange = this.handleMinutesChange.bind(this);
        this.handleMutedChange = this.handleMutedChange.bind(this);
        this.handleThemeChange = this.handleThemeChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keyup', this.enterPressed, false);
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.enterPressed, false);
    }

    setPreferences() {
        localStorage.setItem('isMuted', this.state.isMuted);
        localStorage.setItem('minutes', this.state.minutes);
        localStorage.setItem('theme', this.state.theme);
    }

    handleMinutesChange(numMinutes) {
        let value = parseInt(numMinutes.target.value, 10) || 0;
        this.setState({ minutes: parseInt(value, 10) });
    }

    handleMutedChange(muted) {
        this.setState({ isMuted: muted.target.value === 'true' });
    }

    handleThemeChange(theme) {
        this.setState({
            theme: theme.target.value === 'true' ? 'dark' : 'light'
        });
    }

    onClick() {
        this.setPreferences();
        this.props.onPreferencesSaved({
            minutes: this.state.minutes,
            isMuted: this.state.isMuted,
            theme: this.state.theme
        });
        this.props.onRequestClose();
    }

    enterPressed(event) {
        let key = event.keyCode || event.which;
        if (key === 13) {
            this.onClick();
        }
    }

    render() {
        return (
            <div className="modal-theme">
                <div className="modal-header">
                    <h5 className="modal-title">Settings</h5>
                    <h5 className="modal-title">
                        <a
                            href={pomodoroLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            What is Pomodoro?
                        </a>
                    </h5>
                </div>
                <div className="modal-body">
                    <div className="form-row q-top-buffer">
                        <div className="col-6">
                            <label htmlFor="minutes" className="col-form-label">
                                minutes (1-30)
                                {'  '}
                                <i
                                    className="fa fa-clock-o"
                                    aria-hidden="true"
                                />
                            </label>
                        </div>
                        <div className="col-3">
                            <input
                                type="text"
                                className="form-control"
                                name="minutes"
                                min="1"
                                max="30"
                                maxLength="2"
                                value={this.state.minutes}
                                onChange={this.handleMinutesChange}
                            />
                        </div>
                    </div>
                    <div className="form-row q-top-buffer">
                        <div className="col-6">
                            <label htmlFor="dark">dark mode?</label>
                        </div>
                        <div className="col-6">
                            <div className="form-check form-check-inline">
                                <input
                                    id="dark"
                                    type="radio"
                                    className="form-check-input"
                                    value="true"
                                    checked={this.state.theme === 'dark'}
                                    onChange={this.handleThemeChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="dark"
                                >
                                    <i
                                        className="fa fa-moon-o"
                                        aria-hidden="true"
                                    />
                                    Yes
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    id="light"
                                    type="radio"
                                    className="form-check-input"
                                    value="false"
                                    checked={this.state.theme !== 'dark'}
                                    onChange={this.handleThemeChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="light"
                                >
                                    <i
                                        className="fa fa-sun-o"
                                        aria-hidden="true"
                                    />
                                    No
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-row q-top-buffer">
                        <div className="col-6">
                            <label htmlFor="mute">mute?</label>
                        </div>
                        <div className="col-6">
                            <div className="form-check form-check-inline">
                                <input
                                    id="mute"
                                    type="radio"
                                    className="form-check-input"
                                    value="true"
                                    checked={this.state.isMuted}
                                    onChange={this.handleMutedChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="mute"
                                >
                                    <i
                                        className="fa fa-volume-up"
                                        aria-hidden="true"
                                    />
                                    Yes
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    id="unmute"
                                    type="radio"
                                    className="form-check-input"
                                    value="false"
                                    checked={!this.state.isMuted}
                                    onChange={this.handleMutedChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="unmute"
                                >
                                    <i
                                        className="fa fa-volume-off"
                                        aria-hidden="true"
                                    />
                                    No
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="d-none d-sm-block d-md-block">
                        <hr className="separator" />
                        <h4>Keyboard Shortcuts</h4>
                        <p>Edit Goal = E </p>
                        <p>Start / Pause = F</p>
                        <p>Stop = S</p>
                        <p>Reset = R</p>
                        <p>Preferences = P</p>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        id="save"
                        type="button"
                        className="btn btn-primary"
                        onClick={this.onClick}
                    >
                        Save
                    </button>
                </div>
            </div>
        );
    }
}

export default PreferencesModal;
