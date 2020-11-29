export const getSessionSummary = async () => {
  // todo modify URL once new endpoint exists
  // use env variables for base url
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
