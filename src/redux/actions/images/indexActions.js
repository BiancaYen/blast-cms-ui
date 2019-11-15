// Images Index Actions

import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { imagesIndex as reducerName } from '../../reducers/reducerNames';

// Api
import { ImagesApi } from '../../../api';

// Utils
import base64ToFile from '../../../utils/base64ToFile';

// Action Types
const types = actionTypes(reducerName);

const getFailed = createAction(types.getFailed);
const getLoading = createAction(types.getLoading);
const getSuccess = createAction(types.getSuccess);

const postFailed = createAction(types.postFailed);
const postSubmitting = createAction(types.postSubmitting);
const postSuccess = createAction(types.postSuccess);

const getIndex = () => (dispatch) => {
    dispatch({
        callApiClient: () => ImagesApi.getIndex(),
        reducerName,
        requestType: 'get',
        dispatchFromPayload: data => ({
            data: data.map(({
                id,
                attributes: {
                    alternative_name: alternativeName = '',
                    file = '',
                    file_extension: fileExtension = '',
                    name = ''
                }
            }) => ({
                id,
                name,
                alternativeName,
                file: base64ToFile(file, name, fileExtension)
            }))
        })
    });
};

const postDelete = ({ id, modelName }) => (dispatch) => {
    dispatch({
        callApiClient: () => ImagesApi.postDelete(id),
        reducerName,
        requestType: 'delete',
        dispatchFromPayload: () => {
            dispatch(getIndex());

            return {
                notificationDetail: `"${modelName || 'The Entity'}"`
            };
        }
    });
};

const postDeactivate = ({ id, modelName }) => (dispatch) => {
    dispatch({
        callApiClient: () => ImagesApi.postDeactivate(id),
        reducerName,
        requestType: 'deactivate',
        dispatchFromPayload: () => {
            dispatch(getIndex());

            return {
                notificationDetail: `"${modelName || 'The Entity'}"`
            };
        }
    });
};

export {
    // Action Types
    getFailed,
    getLoading,
    getSuccess,
    postFailed,
    postSubmitting,
    postSuccess,
    // Actions
    getIndex,
    postDeactivate,
    postDelete
};
