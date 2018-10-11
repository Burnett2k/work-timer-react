import React from 'react';
import Preferences from '../components/Preferences.js';
import { connect } from 'react-redux';
import { saveMinutes } from '../actions';
import { saveMute } from '../actions';
import { saveIsNotesPrompt } from '../actions';

class SavePreferences extends React.Component {

	constructor(props) {
		super(props);
		this.getPreferences();
	}

	onPreferencesSaved = (payload) => {
		this.props.dispatch(saveMinutes(payload.minutes));
		this.props.dispatch(saveMute(payload.isMuted));
		this.props.dispatch(saveIsNotesPrompt(payload.isNotesPrompt));
	}

	getPreferences() {
		let muted, minutes, notesPrompt;
		minutes = (localStorage.getItem("minutes") != null) ? localStorage.getItem("minutes") : 25;
		muted = (localStorage.getItem("isMuted") != null) ? localStorage.getItem("isMuted") : "true";
		muted = muted === "true";
		notesPrompt = (localStorage.getItem("isNotesPrompt") != null) ? localStorage.getItem("isNotesPrompt") : "true";
		notesPrompt = notesPrompt === "true";
		this.onPreferencesSaved({minutes: parseInt(minutes, 10), isMuted: muted, isNotesPrompt: notesPrompt});
	}

	render() {
		return (
			<div>
				<Preferences 
					onPreferencesSaved={this.onPreferencesSaved}
					minutes={this.props.minutes}
					isMuted={this.props.isMuted}
					isNotesPrompt={this.props.isNotesPrompt}
					showModal={this.props.showModal}
					toggleModalShown={this.props.toggleModalShown}
				/>
			</div>);
		}
	}

	//only passing in data needed by the children
	function mapStateToProps(state) {
		return {
			minutes: state.preferences.minutes,
			isMuted: state.preferences.isMuted,
			isNotesPrompt: state.preferences.isNotesPrompt
		};
	}


//use connect method to make application aware of the redux store
//doing so makes this a 'smart' component. i.e. a container
export default connect(mapStateToProps)(SavePreferences);
