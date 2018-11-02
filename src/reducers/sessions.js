const sessions = (state = { completed: 0 }, action) => {
    switch (action.type) {
        case 'SAVE_SESSION':
            return {
                ...state,
                completed: action.payload
            };
        default:
            return state;
    }
};

export default sessions;
