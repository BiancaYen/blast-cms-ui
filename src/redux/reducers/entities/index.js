import { combineReducers } from 'redux';

import create from './createReducer';
import edit from './editReducer';
import index from './indexReducer';

const entities = combineReducers({
    create,
    edit,
    index
});

export default entities;
