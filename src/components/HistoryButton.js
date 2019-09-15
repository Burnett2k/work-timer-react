import PropTypes from 'prop-types';
const React = require('react');

class HistoryButton extends React.Component {
    static propTypes = {
        toggleChartVisible: PropTypes.func,
        isChartVisible: PropTypes.bool
    };

    render() {
        return (
            <button
                type="button"
                className="btn btn-outline-primary"
                onClick={this.props.toggleChartVisible}
            >
                <i
                    className="fa fa-bar-chart d-block d-md-none"
                    aria-hidden="true"
                />
                <span className="d-none d-md-block d-lg-block d-xl-block">
                    {this.props.isChartVisible ? 'Timer' : 'History'}
                </span>
            </button>
        );
    }
}

export default HistoryButton;
