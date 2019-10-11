import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { dynamicIndex as reducerName } from '../../reducers/reducerNames';

// Api
import { DynamicApi } from '../../../api';

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
            data: data.map((item) => {
                const object = {};
                Object.entries(item).forEach(([key, value]) => {
                    object[key] = value;
                });
                return object;
            })
        })
    });
};

const postDelete = ({ id, name }) => (dispatch) => {
    dispatch({
        callApiClient: () => DynamicApi.postDelete([id]),
        reducerName,
        requestType: 'delete',
        dispatchFromPayload: () => {
            dispatch(getIndex());

            return {
                notificationDetail: name
            };
        }
    });
};

const postDeletes = ids => (dispatch) => {
    dispatch({
        callApiClient: () => DynamicApi.postDelete(ids),
        reducerName,
        requestType: 'delete',
        dispatchFromPayload: () => {
            dispatch(getIndex());

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
    // Action
    getIndex,
    postDelete,
    postDeletes
};
