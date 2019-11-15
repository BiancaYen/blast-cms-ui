// Entities Create Actions

import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { imagesCreate as reducerName } from '../../reducers/reducerNames';

// Api
import { ImagesApi } from '../../../api';

// Action Creators
import { getIndex } from './indexActions';

// Action Types
const types = actionTypes(reducerName);

const postFailed = createAction(types.postFailed);
const postSubmitting = createAction(types.postSubmitting);
const postSuccess = createAction(types.postSuccess);

const postCreate = ({ data, setFormErrors }) => (dispatch) => {
    const { file } = data;

    const formData = new FormData();
    formData.append('file', file);

    dispatch({
        callApiClient: () => ImagesApi.postCreate(formData, {
            'Content-Type': 'multipart/form-data'
        }),
        reducerName,
        requestType: 'create',
        setFormErrors,
        dispatchFromPayload: () => {
            // @Todo on success we need to update the index data array and not refresh the call as per usual
            dispatch(getIndex());

            return {
                notificationDetail: `The "${data.tableName || 'Image'}"`
            };
        }
    });
};

export {
    // Action Types
    postFailed,
    postSubmitting,
    postSuccess,
    // Actions
    postCreate
};
