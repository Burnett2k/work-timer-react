export const checkAuth = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/auth/login/success`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      }
    );
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error, 'error checking auth');
  }
};
