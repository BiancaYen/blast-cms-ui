// Hero Banners Edit

// State used by: HeroBannersEdit

import { handleActions } from 'redux-actions';
import Joi from 'joi';

// Actions
import * as actions from '../../actions/hero-banners/editActions';

// State update
import {
    loadingToggleTrue,
    loadingToggleFalse,
    submitToggleFalse,
    submitToggleTrue,
    singleResourceUpdate
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
    loading: true,
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
        [actions.postSuccess]: submitToggleFalse,
        [actions.getLoading]: loadingToggleTrue,
        [actions.getFailed]: loadingToggleFalse,
        [actions.getSuccess]: singleResourceUpdate
    },
    initialState
);

export default userReducer;
