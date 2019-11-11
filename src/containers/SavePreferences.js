import React from 'react';
import Preferences from '../components/Preferences.js';
import { connect } from 'react-redux';
import { saveMinutes, saveMute, saveTheme } from '../actions';
import PropTypes from 'prop-types';

class SavePreferences extends React.Component {
    constructor(props) {
        super(props);
        this.setTheme();
    }
    static propTypes = {
        dispatch: PropTypes.func,
        minutes: PropTypes.number,
        isMuted: PropTypes.bool,
        theme: PropTypes.string,
        onPreferencesSaved: PropTypes.func,
        onRequestClose: PropTypes.func,
        showModal: PropTypes.bool,
        toggleModalShown: PropTypes.func,
    };

    onPreferencesSaved = (payload) => {
        this.props.dispatch(saveMinutes(payload.minutes));
        this.props.dispatch(saveMute(payload.isMuted));
        this.props.dispatch(saveTheme(payload.theme));
    };

    componentDidUpdate(oldProps) {
        const newProps = this.props;
        if (oldProps.theme !== newProps.theme) {
            this.setTheme();
        }
    }

    setTheme() {
        if (this.props.theme === 'light') {
            document.documentElement.style.setProperty(
                '--main-bg-color',
                '#ffffff'
            );
            document.documentElement.style.setProperty(
                '--main-text-color',
                '#212529'
            );
            document.documentElement.style.setProperty(
                '--footer-bg-color',
                '#343a40'
            );
            document.documentElement.style.setProperty(
                '--footer-text-color',
                '#ffffff'
            );
            document.documentElement.style.setProperty(
                '--neon-text-color',
                '#000'
            );
            document.documentElement.style.setProperty(
                '--neon-text-shadow',
                'none'
            );
        } else {
            const mainTextColor = '#ffffff';
            const neonTextColor = '#08f';
            document.documentElement.style.setProperty(
                '--main-bg-color',
                '#343a40'
            );
            document.documentElement.style.setProperty(
                '--main-text-color',
                mainTextColor
            );
            document.documentElement.style.setProperty(
                '--footer-bg-color',
                '#212529'
            );
            document.documentElement.style.setProperty(
                '--footer-text-color',
                '#ffffff'
            );
            document.documentElement.style.setProperty(
                '--neon-text-color',
                neonTextColor
            );
            document.documentElement.style.setProperty(
                '--neon-text-shadow',
                `-0.2rem -0.2rem 1rem ${mainTextColor}, 0.2rem 0.2rem 1rem ${mainTextColor}, 0 0 2rem ${neonTextColor}, 0 0 4rem ${neonTextColor}, 0 0 6rem ${neonTextColor}, 0 0 8rem ${neonTextColor}, 0 0 10rem ${neonTextColor}`
            );
        }
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
        theme: state.preferences.theme,
    };
}

export default connect(mapStateToProps)(SavePreferences);
