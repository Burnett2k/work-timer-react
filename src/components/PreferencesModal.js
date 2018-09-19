import PropTypes from 'prop-types';

const React = require('react');
const pomodoroLink = "https://en.wikipedia.org/wiki/Pomodoro_Technique";


class PreferencesModal extends React.Component {

  static propTypes = {
    onSavePreferences: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      minutes: this.props.minutes,
      isMuted: this.props.isMuted
    }

    this.handleMinutesChange = this.handleMinutesChange.bind(this);
    this.handleMutedChange = this.handleMutedChange.bind(this);
    this.onClick = this.onClick.bind(this);

  }

  setPreferences() {
    localStorage.setItem("isMuted", this.state.isMuted);
    localStorage.setItem("minutes", this.state.minutes);
  }

  handleMinutesChange(numMinutes) {
      this.setState({minutes: parseInt(numMinutes.target.value)});
  }

  handleMutedChange(muted) {
      this.setState({isMuted: muted.target.value});
      console.log(this.state.isMuted);
  }

  onClick() {
    this.setPreferences();
    this.props.onPreferencesSaved({minutes: this.state.minutes, isMuted: this.state.isMuted});
    this.props.onRequestClose();
  }

	render() {
		return (
	        <div>
              <div className="modal-header">
                <h5 className="modal-title">Settings</h5>
                <h5 className="modal-title">
                  <a href={pomodoroLink} target="_blank" rel="noopener noreferrer">What is Pomodoro?</a>
                </h5>
              </div>
              <div className="modal-body">
                  <div className="form-row q-top-buffer">
                    <div className="col-6">
                      <label htmlFor="minutes" className="col-form-label">minutes (1-30)</label>
                    </div>
                    <div className="col-4">
                      <input type="text" className="form-control" name="minutes" min="1" max="30" value={this.state.minutes} onChange={this.handleMinutesChange}></input>
                    </div>
                  </div>
                  <div className="form-row q-top-buffer">
                    <div className="col-6">
                      <label htmlFor="mute">mute?</label>
                    </div>
                    <div className="col-4">
                      <label>
                        <input type="radio" value="true" checked={this.state.isMuted === "true"} onChange={this.handleMutedChange}/> Yes
                      </label>
                      <label>
                        <input type="radio" value="false" checked={this.state.isMuted === "false"} onChange={this.handleMutedChange}/> No
                      </label>
                    </div>  
                  </div>
                 <div className="d-none d-sm-block d-md-block">
                  <hr/>
                  <h4>Keyboard Shortcuts</h4>
                  <p> Start / Pause = F</p>
                  <p> Stop          = S</p>
                  <p> Reset         = R</p>
                  <p> Preferences   = P</p>
                </div>
              </div>      
              <div className="modal-footer">
                <button id="save" type="button" className="btn btn-primary" onClick={ this.onClick }>Save</button>
              </div>
        	</div>
		);
	}
}

export default PreferencesModal;	
