import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { dynamicCreate as reducerName } from '../../reducers/reducerNames';

// Api
import { DynamicApi } from '../../../api';

// Utils
import browserHistory from '../../../utils/browserHistory';

// Actions
import { getIndex } from './indexActions';

// Action Types
const types = actionTypes(reducerName);

const postFailed = createAction(types.postFailed);
const postSubmitting = createAction(types.postSubmitting);
const postSuccess = createAction(types.postSuccess);

const postCreate = ({ data, setErrors: setFormErrors, url }) => (dispatch) => {
    dispatch({
        callApiClient: () => DynamicApi.postCreate(url, data),
        reducerName,
        requestType: 'create',
        setFormErrors,
        dispatchFromPayload: () => {
            dispatch(getIndex());

            browserHistory.push(`/${url}`);
            return {
                notificationDetail: data.name || data.title || 'The Entity'
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
