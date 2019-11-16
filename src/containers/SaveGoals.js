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
        notes: PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.state = {
            goalText: props.notes,
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
        this.props.dispatch(saveNotes(''));
        this.setState({
            goalText: '',
        });
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
                        goalText={this.props.notes}
                    />
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        notes: state.timer.notes,
    };
}

export default connect(mapStateToProps)(SaveGoals);
