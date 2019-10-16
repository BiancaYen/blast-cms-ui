import { combineReducers } from 'redux';

import create from './createReducer';
import edit from './editReducer';
import createEditFields from './createEditFieldsReducer';
import index from './indexReducer';

const entities = combineReducers({
    create,
    createEditFields,
    edit,
    index
});

export default entities;
