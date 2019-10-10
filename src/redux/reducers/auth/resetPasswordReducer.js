// Reset Password
// ResetPassword Reducer

// State used by: ResetPassword component

import Joi from 'joi';
import { handleActions } from 'redux-actions';

// Actions
import * as actions from '../../actions/auth/resetPasswordActions';

// State update
import {
    errorsUpdate,
    resetErrors,
    submitToggleFalse,
    submitToggleTrue
} from '../../utils/stateUpdate';

// Initial Data
const initialData = {
    token: '',
    email: '',
    password: '',
    passwordConfirmation: ''
};

// Initial State
const initialState = {
    data: initialData,
    submit: false,
    valid: false,
    errors: {},
    loading: false,
    validationSchema: {
        password: Joi.string().required().label('Password'),
        passwordConfirmation: Joi.string()
            .required()
            .valid(Joi.ref('password'))
            .options({ language: { any: { allowOnly: ' does not match' } } })
            .label('Password confirmation')
    }
};

const resetPasswordReducer = handleActions(
    {
        [actions.postFailed]: errorsUpdate,
        [actions.postSubmitting]: submitToggleTrue,
        [actions.postSuccess]: submitToggleFalse,
        [actions.resetErrors]: resetErrors
    },
    initialState
);

export default resetPasswordReducer;
