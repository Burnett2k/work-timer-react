export const getSessions = async () => {
    // todo modify URL once new endpoint exists
    // use env variables for base url
    const response = await fetch('https://worktimer.xyz/api/sessions', {
        method: 'GET',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
        },
        mode: 'cors',
    });
    const data = await response.json();
    return data;
};
