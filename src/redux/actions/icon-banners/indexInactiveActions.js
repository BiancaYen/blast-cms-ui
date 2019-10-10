import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { iconBannersIndexInactive as reducerName } from '../../reducers/reducerNames';

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

const getBannersInactive = getBannersShared(reducerName, BannersApi.getIconBannersInactive);

const activateBanner = ({ id, name }) => (dispatch) => {
    dispatch({
        callApiClient: () => BannersApi.activateIconBanners([id]),
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
        callApiClient: () => BannersApi.activateIconBanners(bannersIds),
        reducerName,
        requestType: 'activate',
        dispatchFromPayload: () => {
            dispatch(getBannersInactive());
            dispatch(getBannersActive());

            return {
                notificationDetail: `${bannersIds.length} Icon Banners`
            };
        }
    });
};

const deleteBanner = ({ id: bannerId, name }) => (dispatch) => {
    dispatch({
        callApiClient: () => BannersApi.deleteIconBanners([bannerId]),
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
        callApiClient: () => BannersApi.deleteIconBanners(bannersIds),
        reducerName,
        requestType: 'delete',
        dispatchFromPayload: () => {
            dispatch(getBannersActive());
            dispatch(getBannersInactive());

            return {
                notificationDetail: `${bannersIds.length} Icon Banners`
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
