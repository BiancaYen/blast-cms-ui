import { combineReducers } from 'redux';

import index from './indexReducer';

const dataTypes = combineReducers({
    index
});

export default dataTypes;
