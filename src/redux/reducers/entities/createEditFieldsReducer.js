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
    dataTypeId: []
};

// Initial State
const initialState = {
    data: initialData,
    submit: false,
    validationSchema: {
        name: Joi.string().required().label('Name'),
        dataTypeId: Joi.number().required().label('Data Type Id')
    }
};

const fieldsReducer = handleActions(
    {
        [actions.postSubmitting]: submitToggleTrue,
        [actions.postFailed]: submitToggleFalse,
        [actions.postSuccess]: submitToggleFalse
    },
    initialState
);

export default fieldsReducer;
