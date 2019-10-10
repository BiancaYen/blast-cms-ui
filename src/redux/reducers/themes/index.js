// Themes Reducer

// State used by: Themes

import Joi from 'joi';
import { handleActions } from 'redux-actions';

// Actions
import * as actions from '../../actions/themes/themesEditActions';

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
        primary: '',
        secondary: '',
        infobarBackground: '',
        infobarText: '',
        topbarBackground: '',
        bodyBackground: '',
        bodyText: '',
        footerText: '',
        footerBackground: '',
        logoBackground: '',
        logoFile: ''
    },
    validationSchema: {
        primary: Joi.string().required().label('Primary'),
        secondary: Joi.string().required().label('Secondary'),
        infobarBackground: Joi.string().required().label('Infobar Background'),
        infobarText: Joi.string().required().label('Infobar Text'),
        topbarBackground: Joi.string().required().label('Topbar Background'),
        bodyBackground: Joi.string().required().label('Body Background'),
        bodyText: Joi.string().required().label('Body Text'),
        footerText: Joi.string().required().label('Footer Text'),
        footerBackground: Joi.string().required().label('Footer Background'),
        logoBackground: Joi.string().required().label('Logo Background'),
        logoFile: Joi.string().required().label('Logo File')
    }
};

const userReducer = handleActions(
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

export default userReducer;
