
export const userService = {
    login,
    logout,
    getAll,
    hasRole,
    isAuthenticated,
    getCredentials,
};

function getCredentials() {
    return JSON.parse(localStorage.getItem('credentials'));
}

function isAuthenticated() {
    return !!localStorage.getItem('credentials');
}

function hasRole(role) {
    return isAuthenticated() && JSON.parse(localStorage.getItem('credentials')).credentials.role === role;
}

function login(userEmail, userPassword) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            email : userEmail, 
            password : userPassword
        })
    };

    return fetch(`http://localhost:5000/api/users/login`, requestOptions)
        .then(handleResponse)
        .then(credentials => { 
            // login successful if there's a user in the response
            if (credentials) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                localStorage.setItem('credentials', JSON.stringify(credentials));
                
            }
            return credentials;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('credentials');
}

function getAll() {

    //return fetch(`/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
