export const saveSession = async (saveSession) => {
    // todo modify URL once new endpoint exists
    // use env variables for base url
    const response = await fetch('http://localhost:8080/session/save', {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
        },
        mode: 'cors',
        body: JSON.stringify(saveSession),
    });
    return response;
};