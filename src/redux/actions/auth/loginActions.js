import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { authLogin as reducerName } from '../../reducers/reducerNames';

// Utils
import browserHistory from '../../../utils/browserHistory';

// Api
import { AuthApi } from '../../../api';

// Action Types
const types = actionTypes(reducerName);

const postFailed = createAction(types.postFailed);
const postSubmitting = createAction(types.postSubmitting);
const postSuccess = createAction(types.postSuccess);
const resetErrors = createAction(types.resetErrors);

const postLogin = ({ email, password }, { setErrors: setFormErrors }) => (dispatch) => {
    dispatch({
        callApiClient: () => AuthApi.login({ email, password }),
        reducerName,
        requestType: 'post',
        setFormErrors,
        dispatchFromPayload: ({ token }) => {
            localStorage.setItem('token', token);
            browserHistory.push('/welcome');
        }
    });
};

const postLogout = () => (dispatch) => {
    dispatch({
        callApiClient: () => AuthApi.logout({
            token: localStorage.getItem('token')
        }),
        reducerName,
        requestType: 'post',
        dispatchFromPayload: () => {
            localStorage.setItem('token', '');
            browserHistory.push('/');
        }
    });
};

const checkToken = () => (dispatch) => {
    if (localStorage.getItem('token')) {
        dispatch({
            callApiClient: () => AuthApi.checkToken(),
            reducerName,
            requestType: 'post',
            dispatchFromPayload: () => {
                browserHistory.push('/welcome');
            },
            dispatchFromError: () => {
                localStorage.setItem('token', '');
                browserHistory.push('/');
            }
        });
    }
};

export {
    postFailed,
    checkToken,
    postSubmitting,
    postSuccess,
    postLogin,
    postLogout,
    resetErrors
};
