let token = null;
let user = null;
let isAuthenticated = false;

const jwtToken = window.localStorage.getItem('jwtToken');
const userStorage = JSON.parse(window.localStorage.getItem('user'));

if (jwtToken) {
    token = jwtToken;
    isAuthenticated = true;
}

if (userStorage) {
    user = userStorage;
}

const initialState = {
    token,
    user,
    isAuthenticated,
    isAuthenticating: false,
    error: null
}

export default(state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_LOGIN_REQUEST':
            return {
                ...state,
                isAuthenticating: true
            }

        case 'AUTH_LOGIN_ERROR':
            return {
                ...state,
                isAuthenticating: false,
                error: action.error
            }

        case 'AUTH_LOGIN_SUCCESS':
            return {
                ...state,
                token: action.token,
                user: action.user,
                isAuthenticated: true,
                isAuthenticating: false
            }

        case 'AUTH_REFRESH_USER':
                return {
                    ...state,
                    user: action.user
                }

        case 'AUTH_LOGOUT_SUCCESS':
            return {
                token: null,
                user: null,
                isAuthenticated: false,
                isAuthenticating: false
            }
            
        default: 
            return state
    }
}