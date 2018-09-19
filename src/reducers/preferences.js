const preferences = (state = {minutes: 25, isMuted: true }, action) => {
  switch (action.type) {
    case 'SAVE_MINUTES':
      return { 
        ...state, 
        minutes: action.payload 
      }
    case 'SAVE_MUTE':
      return {
        ...state,
        isMuted: action.payload
      }
    default:
      return state
  }
}

export default preferences