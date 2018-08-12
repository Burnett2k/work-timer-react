export const saveMinutes = (minutes) => ({
  type: 'SAVE_MINUTES',
  payload: minutes
})

export const saveMute = (isMuted) => ({
  type: 'SAVE_MUTE',
  payload: isMuted
})