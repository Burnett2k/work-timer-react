import React from 'react';
import GoalLink from '../components/GoalLink';
import GoalInput from '../components/GoalInput';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveNotes } from '../actions';

class SaveGoals extends React.Component {
    static propTypes = {
        isEditMode: PropTypes.bool,
        toggleEditMode: PropTypes.func,
        onGoalEdit: PropTypes.func,
        reset: PropTypes.bool,
        dispatch: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            goalText: '',
        };

        this.onGoalTyping = this.onGoalTyping.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.reset !== this.props.reset) {
            this.onReset();
        }
        if (prevProps.isEditMode !== this.props.isEditMode) {
            this.props.dispatch(saveNotes(this.state.goalText));
        }
    }

    onReset() {
        this.setState({ goalText: '' });
    }

    onGoalTyping(e) {
        this.setState({
            goalText: e.target.value,
        });
    }

    render() {
        return (
            <div className="form-inline justify-content-center q-top-buffer">
                {this.props.isEditMode ? (
                    <GoalInput
                        toggleEditMode={this.props.toggleEditMode}
                        onGoalTyping={this.onGoalTyping}
                        goalText={this.state.goalText}
                    />
                ) : (
                    <GoalLink
                        toggleEditMode={this.props.toggleEditMode}
                        onGoalEdit={this.props.onGoalEdit}
                        goalText={this.state.goalText}
                    />
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        notes: state.goalText,
    };
}

export default connect(mapStateToProps)(SaveGoals);
