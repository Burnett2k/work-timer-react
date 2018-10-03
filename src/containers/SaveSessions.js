import React from 'react';
import { connect } from 'react-redux';
import { saveSessionsCompleted } from '../actions';
import SessionCounter from '../components/SessionCounter';

class SaveSessions extends React.Component {

	constructor(props) {
        super(props);
        this.getSessionsCompleted();
    }
    
    getSessionsCompleted() {
        let completed = (localStorage.getItem("10/2/2018") != null) ? localStorage.getItem("10/2/2018") : 0;
        this.props.dispatch(saveSessionsCompleted(completed));
    }

    incrementSessionsCompleted() {

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
