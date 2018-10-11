import ReactModal from 'react-modal';
import PreferencesModal from './PreferencesModal.js';

const React = require('react');
ReactModal.setAppElement('#root');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    padding               : '10px',
    width                 : '350px'
  }
};

class Preferences extends React.Component {

  constructor (props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.props.toggleModalShown();
  }

	render() {
		return (
	        <div className="Container d-flex flex-row-reverse">
          		<button type='button' className="btn btn-outline-primary" 
          		data-toggle="modal" data-target="#settingsModal" id="preferences" onClick={this.toggleModal}>
          			<i className="fa fa-wrench d-block d-md-none" aria-hidden="true"></i>
          			<span className="d-none d-md-block d-lg-block d-xl-block">Settings</span>
          		</button>
              <ReactModal
                isOpen={this.props.showModal}
                onRequestClose={this.toggleModal}
                style={customStyles}  
              >
                <PreferencesModal 
                  onPreferencesSaved={this.props.onPreferencesSaved}
                  onRequestClose={this.toggleModal}
                  minutes={this.props.minutes}
                  isMuted={this.props.isMuted}
                  isNotesPrompt={this.props.isNotesPrompt}/>
              </ReactModal>
        	</div>
		);
	}
}

export default Preferences;	
