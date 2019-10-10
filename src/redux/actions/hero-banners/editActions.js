import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { heroBannersEdit as reducerName } from '../../reducers/reducerNames';

// Api
import { BannersApi } from '../../../api';

// Utils
import browserHistory from '../../../utils/browserHistory';

// Actions
import { getBannersActive } from './indexActiveActions';
import { getBannersInactive } from './indexInactiveActions';

// Action Types
const types = actionTypes(reducerName);

const postFailed = createAction(types.postFailed);
const postSubmitting = createAction(types.postSubmitting);
const postSuccess = createAction(types.postSuccess);

const getFailed = createAction(types.getFailed);
const getLoading = createAction(types.getLoading);
const getSuccess = createAction(types.getSuccess);

const getHeroBanner = bannerId => (dispatch) => {
    dispatch({
        callApiClient: () => BannersApi.getSingleHeroBanner(bannerId),
        reducerName,
        requestType: 'get',
        dispatchFromPayload: ({
            id,
            attributes: {
                bannerName = '',
                bannerText = '',
                bannerCtaTitle = '',
                redirectUrl = '',
                bannerImageUrl = '',
                templates = []
            }
        }) => ({
            id,
            bannerFile: bannerImageUrl,
            bannerName,
            bannerText,
            bannerCtaTitle,
            redirectUrl,
            templates: templates.map(({ id: templateId }) => templateId)
        })
    });
};

const postUpdateHeroBanner = (id, data, { setErrors: setFormErrors }) => (dispatch) => {
    const formData = new FormData();
    const {
        bannerName,
        bannerText,
        bannerCtaTitle,
        redirectUrl,
        bannerFile,
        templates
    } = data;

    formData.append('banner_name', bannerName);
    formData.append('banner_text', bannerText);
    formData.append('banner_cta_title', bannerCtaTitle);
    formData.append('redirect_url', redirectUrl);

    if (typeof bannerFile !== 'string') {
        formData.append('banner_file', bannerFile);
    }

    templates.forEach((template) => {
        formData.append('templates[]', template);
    });


    dispatch({
        callApiClient: () => BannersApi.updateHeroBanner(id, formData),
        reducerName,
        requestType: 'update',
        setFormErrors,
        dispatchFromPayload: () => {
            dispatch(getBannersActive());
            dispatch(getBannersInactive());

            browserHistory.push('/hero_banners');
            return {
                notificationDetail: bannerName
            };
        }
    });
};

export {
    getFailed,
    getLoading,
    getSuccess,
    postFailed,
    postSubmitting,
    postSuccess,
    getHeroBanner,
    postUpdateHeroBanner
};
