// Entity Create

// State used by: EntitiesCreate

import { handleActions } from 'redux-actions';

// Actions
import * as actions from '../../actions/entities/createActions';

// State update
import {
    submitToggleTrue,
    submitToggleFalse
} from '../../utils/stateUpdate';

// Initial Data
const initialData = {
    dataTypeId: [],
    isNullable: false,
    name: '',
    relationshipId: '',
    relationshipTypeId: ''
};

// Initial State
const initialState = {
    data: initialData,
    submit: false,
    validationSchema: {}
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
