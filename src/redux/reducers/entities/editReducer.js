// Settings Edit Reducer

// State used by: Settings

import Joi from 'joi';
import { handleActions } from 'redux-actions';

// Actions
import * as actions from '../../actions/entities/editActions';

// State update
import {
    loadingToggleFalse,
    loadingToggleTrue,
    singleResourceUpdate,
    submitToggleFalse,
    submitToggleTrue
} from '../../utils/stateUpdate';

// Initial State
const initialState = {
    loading: true,
    data: {
        campaignId: ''
    },
    validationSchema: {
        campaignId: Joi.string().required().label('Campaign Id')
    }
};

const editReducer = handleActions(
    {
        [actions.getFailed]: loadingToggleFalse,
        [actions.getLoading]: loadingToggleTrue,
        [actions.getSuccess]: singleResourceUpdate,
        [actions.postSubmitting]: submitToggleTrue,
        [actions.postFailed]: submitToggleFalse,
        [actions.postSuccess]: submitToggleFalse
    },
    initialState
);

export default editReducer;
