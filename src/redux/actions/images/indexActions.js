// Images Index Actions

import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { imagesIndex as reducerName } from '../../reducers/reducerNames';

// Api
import { ImagesApi } from '../../../api';

// Utils
import convertBase64ToFile from '../../../utils/convertBase64ToFile';

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
                    file_base_64_encoded: fileBase64Encoded = '',
                    file_extension: fileExtension = '',
                    name = ''
                }
            }) => ({
                id,
                name,
                alternativeName,
                file: convertBase64ToFile(fileBase64Encoded, name, fileExtension)
            }))
        })
    });
};

const postDelete = ({ id, displayName }) => (dispatch) => {
    dispatch({
        callApiClient: () => ImagesApi.postDelete(id),
        reducerName,
        requestType: 'delete',
        dispatchFromPayload: () => {
            dispatch(getIndex());

            return {
                notificationDetail: `"${displayName || 'The Entity'}"`
            };
        }
    });
};

const postDeactivate = ({ id, displayName }) => (dispatch) => {
    dispatch({
        callApiClient: () => ImagesApi.postDeactivate(id),
        reducerName,
        requestType: 'deactivate',
        dispatchFromPayload: () => {
            dispatch(getIndex());

            return {
                notificationDetail: `"${displayName || 'The Entity'}"`
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
