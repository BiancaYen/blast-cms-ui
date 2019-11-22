// Image Create

// State used by: MediaIndex > ImagesTab

import { handleActions } from 'redux-actions';
import Joi from 'joi';

// Actions
import * as actions from '../../actions/images/createActions';

// State update
import {
    submitToggleTrue,
    submitToggleFalse
} from '../../utils/stateUpdate';

// Initial Data
const initialData = {
    fields: [],
    name: ''
};

// Initial State
const initialState = {
    data: initialData,
    submit: false,
    validationSchema: {
        file: Joi.any().required().label('File')
    }
};

const createReducer = handleActions(
    {
        [actions.postSubmitting]: submitToggleTrue,
        [actions.postFailed]: submitToggleFalse,
        [actions.postSuccess]: submitToggleFalse
    },
    initialState
);

export default createReducer;
