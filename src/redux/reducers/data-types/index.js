import { combineReducers } from 'redux';

import index from './indexReducer';

const settings = combineReducers({
    index
});

export default settings;
