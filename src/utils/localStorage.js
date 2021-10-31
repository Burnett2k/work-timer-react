const pino = require('pino')({ browser: { asObject: true } });
export const loadState = () => {
  const serializedState = localStorage.getItem('state');
  try {
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error) {
    pino.error(error, 'error saving state');
  }
};
