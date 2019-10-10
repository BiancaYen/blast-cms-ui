// Login
// Login Reducer

// State used by: Login component

import Joi from 'joi';
import { handleActions } from 'redux-actions';

// Actions
import * as actions from '../../actions/auth/loginActions';

// State update
import {
    errorsUpdate,
    resetErrors,
    submitToggleFalse,
    submitToggleTrue
} from '../../utils/stateUpdate';

// Initial Data
const initialData = {
    email: '',
    password: ''
};

// Initial State
const initialState = {
    data: initialData,
    submit: false,
    valid: false,
    errors: {},
    loading: false,
    validationSchema: {
        email: Joi.string().required().email({ minDomainAtoms: 2 }).label('Email address'),
        password: Joi.string().required().label('Password')
    }
};

const loginReducer = handleActions(
    {
        [actions.postFailed]: errorsUpdate,
        [actions.postSubmitting]: submitToggleTrue,
        [actions.postSuccess]: submitToggleFalse,
        [actions.resetErrors]: resetErrors
    },
    initialState
);

export default loginReducer;
