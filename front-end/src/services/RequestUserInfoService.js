const RequestUserInfoService = async(token) => {
    const response = await fetch('http://localhost/user-info', { method: 'POST', headers: { token: token } });
    const data = await response.json();
    return {
        title: data.title,
        userName: data.fullName,
        email: data.email,
        image: data.image,
        status: data.status,
        token: data.token,
        description: data.description
    }
}

export default RequestUserInfoService;