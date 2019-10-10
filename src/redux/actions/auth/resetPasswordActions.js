import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { authResetPassword as reducerName } from '../../reducers/reducerNames';

// Api
import { AuthApi } from '../../../api';

// Utils
import browserHistory from '../../../utils/browserHistory';

// Action Types
const types = actionTypes(reducerName);

const postFailed = createAction(types.postFailed);
const postSubmitting = createAction(types.postSubmitting);
const postSuccess = createAction(types.postSuccess);
const resetErrors = createAction(types.resetErrors);

const postReset = (data, { setErrors: setFormErrors }) => (dispatch) => {
    dispatch({
        callApiClient: () => AuthApi.resetPassword(data),
        reducerName,
        requestType: 'post',
        setFormErrors,
        showNotification: false,
        dispatchFromPayload: ({ token }) => {
            localStorage.setItem('token', token);
            browserHistory.push('/welcome');
        }
    });
};

const postAcceptInvitation = (data, { setErrors: setFormErrors }) => (dispatch) => {
    dispatch({
        callApiClient: () => AuthApi.acceptInvitation(data),
        reducerName,
        requestType: 'post',
        setFormErrors,
        showNotification: false,
        dispatchFromPayload: ({ token }) => {
            localStorage.setItem('token', token);
            browserHistory.push('/welcome');
        }
    });
};

export {
    postFailed,
    postReset,
    postAcceptInvitation,
    postSubmitting,
    postSuccess,
    resetErrors
};
