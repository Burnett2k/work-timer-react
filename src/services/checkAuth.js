export const checkAuth = async () => {
    const response = await fetch('http://localhost:8080/auth/login/success', {
        method: 'GET',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
        },
    });
    return response;
};
