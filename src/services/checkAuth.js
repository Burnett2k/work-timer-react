export const checkAuth = async () => {
    const response = await fetch('https://worktimer.xyz/auth/login/success', {
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
