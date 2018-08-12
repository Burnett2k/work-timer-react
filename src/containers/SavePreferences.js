import React from 'react';
import Preferences from '../components/Preferences.js';
import { connect } from 'react-redux';
import { saveMinutes } from '../actions';
import { saveMute } from'../actions';

class SavePreferences extends React.Component {

	onPreferencesSaved = (payload) => {
		this.props.dispatch(saveMinutes(payload.minutes));
		this.props.dispatch(saveMute(payload.isMuted));
	}

  //let minutes, isMuted;
  render() {
  	return (
	    <div>
	      <Preferences 
	      	onPreferencesSaved={this.onPreferencesSaved}
      		/>
	    </div>);
	}
}

//only passing in data needed by the children
function mapStateToProps(state) {
	return {
		preferences: state.preferences
	};
}


//use connect method to make application aware of the redux store
//doing so makes this a 'smart' component. i.e. a container
export default connect(mapStateToProps)(SavePreferences);