import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { authRecoverPassword as reducerName } from '../../reducers/reducerNames';

// Api
import { AuthApi } from '../../../api';

// Action Types
const types = actionTypes(reducerName);

const postFailed = createAction(types.postFailed);
const postSubmitting = createAction(types.postSubmitting);
const postSuccess = createAction(types.postSuccess);
const resetErrors = createAction(types.resetErrors);

const postRecover = (email, { setErrors: setFormErrors }) => (dispatch) => {
    dispatch({
        callApiClient: () => AuthApi.recoverPassword(email),
        reducerName,
        requestType: 'post',
        setFormErrors,
        showNotification: false,
        dispatchFromPayload: () => {}
    });
};

export {
    postFailed,
    postRecover,
    postSubmitting,
    postSuccess,
    resetErrors
};
