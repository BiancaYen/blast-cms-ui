import { combineReducers } from 'redux';

import create from './createReducer';
import edit from './editReducer';
import index from './indexReducer';

const dynamic = combineReducers({
    create,
    edit,
    index
});

export default dynamic;
