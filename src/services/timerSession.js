export const saveSession = async (saveSession) => {
    //todo modify URL once new endpoint exists
    // use env variables for base url
    const response = await fetch('http://localhost:8080/auth/login/success', {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(saveSession),
    });
    return response;
};
