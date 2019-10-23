import { combineReducers } from 'redux';

import create from './createReducer';
import index from './indexReducer';

const entities = combineReducers({
    create,
    index
});

export default entities;
