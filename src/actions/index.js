export const saveMinutes = minutes => ({
    type: 'SAVE_MINUTES',
    payload: minutes
});

export const saveMute = isMuted => ({
    type: 'SAVE_MUTE',
    payload: isMuted
});

export const saveTheme = theme => ({
    type: 'SAVE_THEME',
    payload: theme
});

export const saveSecondsRemaining = secondsRemaining => ({
    type: 'SAVE_SECONDS_REMAINING',
    payload: secondsRemaining
});

export const saveStatus = status => ({
    type: 'SAVE_STATUS',
    payload: status
});

export const saveSessionsCompleted = completed => ({
    type: 'SAVE_SESSION',
    payload: completed
});

export const saveIsNotesPrompt = isNotesPrompt => ({
    type: 'SAVE_NOTES_PROMPT',
    payload: isNotesPrompt
});
