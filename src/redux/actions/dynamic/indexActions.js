// Dynamic Index Actions

import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { dynamicIndex as reducerName } from '../../reducers/reducerNames';

// Api
import { DynamicApi } from '../../../api';

// Actions
import { getIndex as getMetaIndex } from './metaActions';

// Action Types
const types = actionTypes(reducerName);

const getFailed = createAction(types.getFailed);
const getLoading = createAction(types.getLoading);
const getSuccess = createAction(types.getSuccess);

const getIndex = url => (dispatch) => {
    dispatch({
        callApiClient: () => DynamicApi.getIndex(url),
        reducerName,
        requestType: 'get',
        dispatchFromPayload: data => ({
            data: data.map(({ id, attributes }) => {
                const object = {
                    id
                };
                Object.entries(attributes).forEach(([key, value]) => {
                    object[key] = value;
                });
                return object;
            })
        })
    });
};

const postDelete = ({ data: { id, name }, url }) => (dispatch) => {
    dispatch({
        callApiClient: () => DynamicApi.postDelete(url, id),
        reducerName,
        requestType: 'delete',
        dispatchFromPayload: () => {
            dispatch(getIndex(url));
            dispatch(getMetaIndex(url));

            return {
                notificationDetail: `"${name || 'The Entity'}"`
            };
        }
    });
};

const postDeletes = (ids, url) => (dispatch) => {
    dispatch({
        callApiClient: () => DynamicApi.postDelete(ids),
        reducerName,
        requestType: 'delete',
        dispatchFromPayload: () => {
            dispatch(getIndex(url));
            dispatch(getMetaIndex(url));

            return {
                notificationDetail: `${ids.length} Entities`
            };
        }
    });
};

export {
    // Action Types
    getFailed,
    getLoading,
    getSuccess,
    // Actions
    getIndex,
    postDelete,
    postDeletes
};
