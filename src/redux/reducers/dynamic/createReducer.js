// Entity Create

// State used by: EntitiesCreate

import { handleActions } from 'redux-actions';
import Joi from 'joi';

// Actions
import * as actions from '../../actions/entities/createActions';

// State update
import {
    submitToggleTrue,
    submitToggleFalse
} from '../../utils/stateUpdate';

// Initial Data
const initialData = {
    name: '',
    fields: []
};

// Initial State
const initialState = {
    data: initialData,
    submit: false,
    validationSchema: {
        name: Joi.string().required().label('Name'),
        fields: Joi.array().min(1).label('Fields')
    }
};

const userReducer = handleActions(
    {
        [actions.postSubmitting]: submitToggleTrue,
        [actions.postFailed]: submitToggleFalse,
        [actions.postSuccess]: submitToggleFalse
    },
    initialState
);

export default userReducer;
