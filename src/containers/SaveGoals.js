import React from 'react';
import GoalLink from '../components/GoalLink';
import GoalInput from '../components/GoalInput';
import PropTypes from 'prop-types';

class SaveGoals extends React.Component {
    static propTypes = {
        isEditMode: PropTypes.string,
        toggleEditMode: PropTypes.func,
        onGoalEdit: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            goalText: ''
        };

        this.onGoalTyping = this.onGoalTyping.bind(this);
    }

    onGoalTyping(e) {
        this.setState({
            goalText: e.target.value
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

export default SaveGoals;
