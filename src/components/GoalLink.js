import PropTypes from 'prop-types';
const React = require('react');

const goalStyles = {
    display: 'inline-block',
    verticalAlign: 'baseline',
    textAlign: 'center',
    paddingRight: '40px',
};

const pointerStyle = {
    cursor: 'pointer',
    fontSize: '20px',
};

class GoalLink extends React.Component {
    static propTypes = {
        goalText: PropTypes.string,
        toggleEditMode: PropTypes.func,
    };

    componentDidMount() {
        this.keyPressed = this.keyPressed.bind(this);
    }

    keyPressed(event) {
        let key = event.keyCode || event.which;
        if (key === 13 || key === 32) {
            this.props.toggleEditMode();
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.goalText && this.props.goalText.length > 0 ? (
                    <span>
                        <h1 className="display-2" style={goalStyles}>
                            Goal: {this.props.goalText}
                            <i
                                className="fa fa-lg fa-pencil-square-o"
                                title="edit"
                                onClick={this.props.toggleEditMode}
                                onKeyDown={(e) => this.keyPressed(e)}
                                style={pointerStyle}
                                role="button"
                                tabIndex={0}
                            />
                        </h1>
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
