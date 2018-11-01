const axios = require('axios')

async function login(username, password) {
    try {
        console.log("start login");
        const loginStatus = await axios.post(process.env.REACT_APP_API_URL + "/api/user/login", {user:{username, password}}, 
        {
            withCredentials: true,
            validateStatus: validateStatus
        });
        console.log(loginStatus);
        if(loginStatus.data.user) {
            return {user: loginStatus.data.user};
        } else {
            return {message: loginStatus.data.message}
        }
    } catch (error) {
        console.log(`login failure ${error}`);
        return {message: `Login unhandled failure. ${error.message}`}
    }
}

async function signup(username, password) {
    try {
        console.log("started Signup----");
        const signupStatus = await axios.post(process.env.REACT_APP_API_URL + "/api/user/signup", {user:{username, password}}, 
        {
            withCredentials: true,
            validateStatus: validateStatus
        });
        console.log(signupStatus);
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
        console.log("started Change Password----");
        const passwordStatus = await axios.put(process.env.REACT_APP_API_URL + "/api/user/change_password", {user:{password}}, 
        {
            withCredentials: true,
            validateStatus: validateStatus
        });
        console.log(passwordStatus);
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
        console.log("started logout----");
        const logoutStatus = await axios.post(process.env.REACT_APP_API_URL + "/api/user/logout", {}, {withCredentials: true});
        console.log(logoutStatus);
    } catch (error) {
        throw error;
    }
}

function validateStatus(status) {
    return true;
}

export {login, signup, logout, changePassword} 

