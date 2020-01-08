import ReactModal from 'react-modal';
import PreferencesModal from './PreferencesModal.js';
import PropTypes from 'prop-types';

const React = require('react');
ReactModal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
        width: '350px',
    },
};

class Preferences extends React.Component {
    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
    }

    static propTypes = {
        toggleModalShown: PropTypes.func,
        showModal: PropTypes.bool,
        onPreferencesSaved: PropTypes.func,
        minutes: PropTypes.number,
        isMuted: PropTypes.bool,
        theme: PropTypes.string,
    };

    toggleModal() {
        this.props.toggleModalShown();
    }

    render() {
        return (
            <React.Fragment>
                <button
                    type="button"
                    className="btn btn-outline-primary m-1"
                    onClick={this.toggleModal}
                >
                    <i
                        className="fa fa-wrench d-block d-md-none"
                        aria-hidden="true"
                    />
                    <span className="d-none d-md-block d-lg-block d-xl-block">
                        Settings
                    </span>
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
                        theme={this.props.theme}
                    />
                </ReactModal>
            </React.Fragment>
        );
    }
}

export default Preferences;
