const React = require('react');
const pomodoroLink = "https://en.wikipedia.org/wiki/Pomodoro_Technique";

class PreferencesModal extends React.Component {

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
                        <input id='minutes' type="number" className="form-control" name="minutes" min="1" max="30" defaultValue="25"></input>
                      </div>
                  </div>
                  <div>
                    <input id="mute" type="checkbox"></input>
                    <label className="form-check-label" htmlFor="mute">Mute?</label>
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
              <div className="modal-footer">
                <button id="save" type="button" className="btn btn-primary">Save</button>
              </div>
        	</div>
		);
	}
}

export default PreferencesModal;	