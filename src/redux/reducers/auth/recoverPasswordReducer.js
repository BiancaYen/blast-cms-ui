// Recover Password
// RecoverPassword Reducer

// State used by: RecoverPassword component

import Joi from 'joi';
import { handleActions } from 'redux-actions';

// Actions
import * as actions from '../../actions/auth/recoverPasswordActions';

// State update
import {
    errorsUpdate,
    resetErrors,
    submitToggleTrue
} from '../../utils/stateUpdate';

// Initial Data
const initialData = {
    email: ''
};

// Initial State
const initialState = {
    data: initialData,
    submit: false,
    valid: false,
    errors: {},
    success: false,
    loading: false,
    validationSchema: {
        email: Joi.string().required().email({ minDomainAtoms: 2 }).label('Email address')
    }
};

const recoverPasswordReducer = handleActions(
    {
        [actions.postFailed]: errorsUpdate,
        [actions.postSubmitting]: submitToggleTrue,
        [actions.postSuccess]: state => ({
            ...state,
            submit: false,
            errors: {},
            success: true
        }),
        [actions.resetErrors]: resetErrors
    },
    initialState
);

export default recoverPasswordReducer;
