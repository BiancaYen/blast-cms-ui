import { combineReducers } from 'redux';

import index from './indexReducer';

const relationshipTypes = combineReducers({
    index
});

export default relationshipTypes;
