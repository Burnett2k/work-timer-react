import React from 'react';
import Preferences from '../components/Preferences.js';
import { connect } from 'react-redux';
import { saveMinutes, saveMute, saveTheme } from '../actions';
import PropTypes from 'prop-types';

class SavePreferences extends React.Component {
    constructor(props) {
        super(props);
        this.getPreferences();
    }
    static propTypes = {
        dispatch: PropTypes.func,
        minutes: PropTypes.string,
        isMuted: PropTypes.string,
        theme: PropTypes.string,
        onPreferencesSaved: PropTypes.func,
        onRequestClose: PropTypes.func,
        showModal: PropTypes.string,
        toggleModalShown: PropTypes.func
    };

    onPreferencesSaved = payload => {
        this.props.dispatch(saveMinutes(payload.minutes));
        this.props.dispatch(saveMute(payload.isMuted));
        this.props.dispatch(saveTheme(payload.theme));
    };

    getPreferences() {
        let muted, minutes, theme;
        minutes =
            localStorage.getItem('minutes') != null
                ? localStorage.getItem('minutes')
                : 25;
        muted =
            localStorage.getItem('isMuted') != null
                ? localStorage.getItem('isMuted')
                : 'true';
        muted = muted === 'true';
        theme =
            localStorage.getItem('theme') != null
                ? localStorage.getItem('theme')
                : 'light';
        this.onPreferencesSaved({
            minutes: parseInt(minutes, 10),
            isMuted: muted,
            theme: theme
        });
    }

    render() {
        return (
            <div>
                <Preferences
                    onPreferencesSaved={this.onPreferencesSaved}
                    minutes={this.props.minutes}
                    isMuted={this.props.isMuted}
                    theme={this.props.theme}
                    showModal={this.props.showModal}
                    toggleModalShown={this.props.toggleModalShown}
                />
            </div>
        );
    }
}

//only passing in data needed by the children
function mapStateToProps(state) {
    return {
        minutes: state.preferences.minutes,
        isMuted: state.preferences.isMuted,
        theme: state.preferences.theme
    };
}

//use connect method to make application aware of the redux store
//doing so makes this a 'smart' component. i.e. a container
export default connect(mapStateToProps)(SavePreferences);
