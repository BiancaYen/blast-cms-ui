// Hero Banners Create

// State used by: HeroBannersCreate

import { handleActions } from 'redux-actions';
import Joi from 'joi';

// Actions
import * as actions from '../../actions/hero-banners/createActions';

// State update
import {
    submitToggleTrue,
    submitToggleFalse
} from '../../utils/stateUpdate';

// Utils
import checkUrlRegex from '../../utils/checkUrlRegex';

// Initial Data
const initialData = {
    bannerName: '',
    bannerText: '',
    bannerCtaTitle: '',
    redirectUrl: '',
    bannerFile: '',
    templates: []
};

// Initial State
const initialState = {
    data: initialData,
    submit: false,
    validationSchema: {
        bannerName: Joi.string().required().label('Banner Name'),
        bannerText: Joi.string().required().label('Banner Text'),
        bannerCtaTitle: Joi.string().required().label('Banner CTA Title'),
        bannerFile: Joi.any().invalid('').required(),
        redirectUrl: Joi.string()
            .regex(checkUrlRegex)
            .required()
            .error(() => ({ message: '"Banner Redirect URL" is invalid' }))
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
