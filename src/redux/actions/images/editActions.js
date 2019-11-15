// Image Edit Actions

import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { imagesEdit as reducerName } from '../../reducers/reducerNames';

// Api
import { ImagesApi } from '../../../api';

// Actions
import { getIndex } from './indexActions';

// Action Types
const types = actionTypes(reducerName);

const postFailed = createAction(types.postFailed);
const postSubmitting = createAction(types.postSubmitting);
const postSuccess = createAction(types.postSuccess);

const postEdit = ({
    data,
    id,
    setFormErrors
}) => (dispatch) => {
    dispatch({
        callApiClient: () => ImagesApi.postEdit(id, data),
        reducerName,
        requestType: 'edit',
        setFormErrors,
        dispatchFromPayload: () => {
            dispatch(getIndex());
            return {
                notificationDetail: `"${data.alternativeName || 'The Image'}"`
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
    postEdit
};
