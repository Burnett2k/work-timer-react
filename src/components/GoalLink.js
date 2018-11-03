const React = require('react');
import PropTypes from 'prop-types';

const goalStyles = {
    display: 'inline-block',
    verticalAlign: 'baseline',
    textAlign: 'center',
    paddingRight: '40px'
};

const pointerStyle = {
    cursor: 'pointer'
};

class GoalLink extends React.Component {
    static propTypes = {
        goalText: PropTypes.string,
        toggleEditMode: PropTypes.func
    };

    render() {
        return (
            <React.Fragment>
                {this.props.goalText && this.props.goalText.length > 0 ? (
                    <span>
                        <h1 className="display-2" style={goalStyles}>
                            Goal: {this.props.goalText}
                        </h1>

                        <i
                            className="fa fa-lg fa-pencil-square-o"
                            title="edit"
                            onClick={this.props.toggleEditMode}
                            onKeyDown={this.props.toggleEditMode}
                            style={pointerStyle}
                            role="button"
                            tabIndex={0}
                        />
                    </span>
                ) : (
                    <a href="# " onClick={this.props.toggleEditMode}>
                        Want to set a goal?
                    </a>
                )}
            </React.Fragment>
        );
    }
}

export default GoalLink;
