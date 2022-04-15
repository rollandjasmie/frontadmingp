import axios from 'axios';
import history from './history';
import store from './store';
import { userLogoutAttempt } from './redux/Auth/auth.action';


axios.defaults.baseURL = 'https://backgplocation.herokuapp.com/';
// axios.defaults.baseURL = 'http://localhost:4000';


/**
 * Injecting token to axios instance
 */
axios.interceptors.request.use(config => {
    let token = null;

    const jwtToken = window.localStorage.getItem('jwtToken')

    if (jwtToken) {
        token = jwtToken;
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        config.headers.Authorization = null;
        history.push("/login");
    }

    return config;
});

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    let status = null;

    if (error.response) {
        if (error.response.status) {
            status = error.response.status;
        }
    }

    if (401 === status) {
        window.localStorage.removeItem('jwtToken');
        window.localStorage.removeItem('user');
        store.dispatch(userLogoutAttempt());
    } else {
        return Promise.reject(error);
    }
});

export default axios;
