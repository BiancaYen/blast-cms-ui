import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { heroBannersCreate as reducerName } from '../../reducers/reducerNames';

// Api
import { EntitiesApi } from '../../../api';

// Utils
import browserHistory from '../../../utils/browserHistory';

// Actions
import { getIndex } from './indexActions';

// Action Types
const types = actionTypes(reducerName);

const postFailed = createAction(types.postFailed);
const postSubmitting = createAction(types.postSubmitting);
const postSuccess = createAction(types.postSuccess);

const postCreate = (data, { setErrors: setFormErrors }) => (dispatch) => {
    const {
        name,
        fields
    } = data;

    dispatch({
        callApiClient: () => EntitiesApi.createHeroBanner({
            name,
            fields
        }),
        reducerName,
        requestType: 'create',
        setFormErrors,
        dispatchFromPayload: () => {
            dispatch(getIndex());

            browserHistory.push('/entity');
            return {
                notificationDetail: name || 'The Entity'
            };
        }
    });
};

export {
    postFailed,
    postSubmitting,
    postSuccess,
    postCreate
};
