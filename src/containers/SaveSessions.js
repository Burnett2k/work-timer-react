import React from 'react';
import { connect } from 'react-redux';
import { saveSessionsCompleted } from '../actions';
import SessionCounter from '../components/SessionCounter';

class SaveSessions extends React.Component {

	componentDidUpdate(prevProps) {
		if (prevProps.sessionComplete !== this.props.sessionComplete) {
			this.saveSessionsCompleted(true)
		}
	}

	componentDidMount() {
		this.saveSessionsCompleted(false);
	}

	saveSessionsCompleted(increment) {
		const today = this.getFormattedDate();
		let completed = (localStorage.getItem(today) != null) ? parseInt(localStorage.getItem(today), 10) : 0;
		completed = increment ? completed + 1 : completed; 
		this.props.dispatch(saveSessionsCompleted(completed));
		localStorage.setItem(today, completed);
	}
	
    getSessionsCompleted() {
		const today = this.getFormattedDate();
        return (localStorage.getItem(today) != null) ? parseInt(localStorage.getItem(today), 10) : 0;
    }
	
	getFormattedDate() {
		let todayTime = new Date();
		let month = todayTime.getMonth() + 1;
		let day = todayTime.getDate();
		let year = todayTime.getFullYear();
		return `${month}/${day}/${year}`;
	}

	render() {
		return (
			<div>
                <SessionCounter 
                    completed={this.props.completed}
				/>
			</div>);
		}
	}

	//only passing in data needed by the children
	function mapStateToProps(state) {
		return {
			completed: state.sessions.completed
		};
	}


//use connect method to make application aware of the redux store
//doing so makes this a 'smart' component. i.e. a container
export default connect(mapStateToProps)(SaveSessions);
