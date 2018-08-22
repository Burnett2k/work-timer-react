export const saveMinutes = (minutes) => ({
  type: 'SAVE_MINUTES',
  payload: minutes
})

export const saveMute = (isMuted) => ({
  type: 'SAVE_MUTE',
  payload: isMuted
})

export const saveSecondsRemaining = (secondsRemaining) => ({
  type: 'SAVE_TIME_REMAINING',
  payload: secondsRemaining
})

export const saveStatus = (status) => ({
  type: 'SAVE_STATUS',
  payload: status
})