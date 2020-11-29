export const getSessions = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_BASE_URL}/sessions`,
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
  return data;
};
