export const getSessionSummary = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_BASE_URL}/sessions/summary`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      mode: 'cors',
    }
  );
  const data = await response.json();

  if (data.success && data.aggregate) {
    return data.aggregate;
  } else {
    return null;
  }
};
