import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { heroBannersIndexInactive as reducerName } from '../../reducers/reducerNames';

// Actions
import getBannersShared from './sharedActions';
import { getBannersActive } from './indexActiveActions';

// Api
import { BannersApi } from '../../../api';

// Action Types
const types = actionTypes(reducerName);

const getFailed = createAction(types.getFailed);
const getLoading = createAction(types.getLoading);
const getSuccess = createAction(types.getSuccess);

const getBannersInactive = getBannersShared(reducerName, BannersApi.getHeroBannersInactive);

const activateBanner = ({ id, name }) => (dispatch) => {
    dispatch({
        callApiClient: () => BannersApi.activateHeroBanners([id]),
        reducerName,
        requestType: 'activate',
        dispatchFromPayload: () => {
            dispatch(getBannersInactive());
            dispatch(getBannersActive());

            return {
                notificationDetail: name
            };
        }
    });
};

const activateBanners = bannersIds => (dispatch) => {
    dispatch({
        callApiClient: () => BannersApi.activateHeroBanners(bannersIds),
        reducerName,
        requestType: 'activate',
        dispatchFromPayload: () => {
            dispatch(getBannersInactive());
            dispatch(getBannersActive());

            return {
                notificationDetail: `${bannersIds.length} Hero Banners`
            };
        }
    });
};

const deleteBanner = ({ id: bannerId, name }) => (dispatch) => {
    dispatch({
        callApiClient: () => BannersApi.deleteHeroBanners([bannerId]),
        reducerName,
        requestType: 'delete',
        dispatchFromPayload: () => {
            dispatch(getBannersActive());
            dispatch(getBannersInactive());

            return {
                notificationDetail: name
            };
        }
    });
};

const deleteBanners = bannersIds => (dispatch) => {
    dispatch({
        callApiClient: () => BannersApi.deleteHeroBanners(bannersIds),
        reducerName,
        requestType: 'delete',
        dispatchFromPayload: () => {
            dispatch(getBannersActive());
            dispatch(getBannersInactive());

            return {
                notificationDetail: `${bannersIds.length} Hero Banners`
            };
        }
    });
};

export {
    activateBanner,
    activateBanners,
    deleteBanner,
    deleteBanners,
    getBannersInactive,
    getFailed,
    getLoading,
    getSuccess
};
