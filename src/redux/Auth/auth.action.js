import axios from '../../axios';
import history from '../../history';

export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';


export const authLoginRequest = () => ({
    type: AUTH_LOGIN_REQUEST
});

export const authLoginError = (error) => ({
    type: AUTH_LOGIN_ERROR,
    error
});

export const authLoginSuccess = (token, user) => ({
    type: AUTH_LOGIN_SUCCESS,
    token,
    user
});

export const authLogoutSuccess = () => ({
    type: AUTH_LOGOUT_SUCCESS
});

export const userLoginAttempt = ({ username, password }) => {
    return (dispatch) => {
        dispatch(authLoginRequest());
        return axios.post('/login', {
            username: username,
            password: password
        }).then(response => {
            if (response) {
                const token = response.data.token;
                const user = response.data.user ? response.data.user : null;

                dispatch((authLoginSuccess(token, user)))
                console.log(history.location.pathname);

                const redirect_if = ['/login', '/'];
                if (redirect_if.includes(history.location.pathname)) {
                    history.push('/');
                    window.location.reload()
                }
            } else {
                const message = 'Utilisateur ou mot de passe incorrect';

                dispatch((authLoginError(message)))
            }
        }).catch(error => {
            let status = null;

            if (error.response) {
                if (error.response.status) {
                    status = error.response.status;
                }
            }

            console.log('/auth/login[error]', error);
            
            let message = '';

            if (401 === status) {
                message = 'Utilisateur ou mot de passe incorrect';
            } else if (500 === status) {
                message = 'Une erreur est survenue. Réessayer à nouveau !';
            }
            
            dispatch((authLoginError(message)))
        })
    }
}


export const userLogoutAttempt = () => {
    return (dispatch) => {
        window.localStorage.removeItem('jwtToken');
        window.localStorage.removeItem('user');
        return dispatch(authLogoutSuccess());
    }
}

export const AUTH_REFRESH_USER = 'AUTH_REFRESH_USER';

export const authRefreshUser = (user) => {
    return {
        type: AUTH_REFRESH_USER,
        user
    }
}