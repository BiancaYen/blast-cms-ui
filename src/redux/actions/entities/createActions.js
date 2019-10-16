import { createAction } from 'redux-actions';

import actionTypes from '../actionTypes';
import { entitiesCreate as reducerName } from '../../reducers/reducerNames';

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

const postCreate = ({ data, setFormErrors }) => (dispatch) => {
    const {
        fields,
        tableName
    } = data;

    const formattedFields = fields.map(({ name: fieldName, dataTypeId, isNullable }) => {
        const formattedField = {
            data_type_id: dataTypeId,
            is_nullable: isNullable,
            name: fieldName
        };
        return JSON.stringify(formattedField);
    });

    dispatch({
        callApiClient: () => EntitiesApi.postCreate({
            fields: formattedFields,
            table_name: tableName
        }),
        reducerName,
        requestType: 'create',
        setFormErrors,
        dispatchFromPayload: () => {
            dispatch(getIndex());

            browserHistory.push('/entities');
            return {
                notificationDetail: `${data.name || data.title || 'The Entity'}`
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
