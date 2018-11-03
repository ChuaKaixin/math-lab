const axios = require('axios')
axios.defaults.withCredentials = true;

async function login(username, password) {
    try {
        const loginStatus = await axios.post(process.env.REACT_APP_API_URL + "/api/user/login", {user:{username, password}}, 
        {
            validateStatus: validateStatus
        });
        if(loginStatus.data.user) {
            return {user: loginStatus.data.user};
        } else {
            return {message: loginStatus.data.message}
        }
    } catch (error) {
        return {message: `Login unhandled failure. ${error.message}`}
    }
}

async function signup(username, password) {
    try {
        const signupStatus = await axios.post(process.env.REACT_APP_API_URL + "/api/user/signup", {user:{username, password}}, 
        {
            validateStatus: validateStatus
        });
        if(signupStatus.data.user) {
            return {user: signupStatus.data.user};
        } else {
            return {message: signupStatus.data.message}
        }
    } catch (error) {
        return {message: `Signup unhandled failure: ${error.message}`};
    }
}

async function changePassword(password) {
    try {
        const passwordStatus = await axios.put(process.env.REACT_APP_API_URL + "/api/user/change_password", {user:{password}}, 
        {
            validateStatus: validateStatus
        });
        if(passwordStatus.status) {
            return {status: passwordStatus.data.status};
        } else {
            return {message: passwordStatus.data.message}
        }
    } catch (error) {
        return {message: `Change password unhandled failure: ${error.message}`};
    }
}

async function logout() {
    try {
        await axios.post(process.env.REACT_APP_API_URL + "/api/user/logout", {}, {withCredentials: true});
    } catch (error) {
        throw error;
    }
}

function validateStatus(status) {
    return true;
}

export {login, signup, logout, changePassword} 

