const evalCreds = (data) => {
    let status = true;
    let rules = {};
    if (data.full_name.length < 5) {
        status = false;
        rules.full_name = 'First name or surname is too short';
    }
    if (data.full_name.length > 25) {
        status = false;
        rules.full_name = 'First name or surname is too long'
    }
    const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!pattern.test(data.password)) {
        status = false;
        rules.password = 'Password must be at least 8 characters long and have 1 uppercase, 1 lowercase a number and a special character';
    }
    if (data.password !== data.password_confirmation) {
        status = false;
        rules.password_confirmation = 'Passwords do not match';
    }
    if (data.login.length < 5) {
        status = false;
        rules.login = 'Login is too short';
    }
    return { status, rules };
}

export default evalCreds;