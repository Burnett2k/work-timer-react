import PropTypes from 'prop-types';
const React = require('react');

class HistoryButton extends React.Component {
    static propTypes = {
        toggleChartVisible: PropTypes.func,
        currentView: PropTypes.string,
    };

    render() {
        return (
            <button
                type="button"
                className="btn btn-outline-primary m-1"
                onClick={this.props.toggleChartVisible}
            >
                <i
                    className="fa fa-bar-chart d-block d-md-none"
                    aria-hidden="true"
                />
                <span className="d-none d-md-block d-lg-block d-xl-block">
                    {this.props.currentView === 'timer' ? 'History' : 'Timer'}
                </span>
            </button>
        );
    }
}

export default HistoryButton;
