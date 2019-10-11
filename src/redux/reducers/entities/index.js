import { combineReducers } from 'redux';

import create from './createReducer';
import edit from './editReducer';
import index from './indexReducer';

const settings = combineReducers({
    create,
    edit,
    index
});

export default settings;
