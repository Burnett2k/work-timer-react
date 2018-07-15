const React = require('react');

class PreferencesModal extends React.Component {

	render() {
		return (
	        <div className="modal fade" id="settingsModal">
            <div className="modal-dialog">
              <form>
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Settings</h5>
                    <h5 className="modal-title">
                      <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank" rel="noopener noreferrer">What is Pomodoro?</a>
                  </div>
                  <div className="modal-body">
                    <div className="form-group row">
                      <label for="minutes" className="col-form-label col-4">minutes (1-30)</label>
                      <div className="col-4">
                        <input id='minutes' type="number" className="form-control" name="minutes" min="1" max="30" value="25"></input>
                      </div>
                    </div>
                    <div className="form-check">
                      <input id="mute" className="form-check-input" type="checkbox" checked></input>
                      <label for="mute" className="form-check-label">Mute?</label>
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
                    <button id="save" type="button" className="btn btn-primary">Save</button>
                  </div>
                </div>
              </form>
            </div>

          		
        	</div>
		);
	}
}

module.exports = PreferencesModal;	