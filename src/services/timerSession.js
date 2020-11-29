export const saveSession = async (saveSession) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_BASE_URL}/sessions/save`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      mode: 'cors',
      body: JSON.stringify(saveSession),
    }
  );
  return response;
};
