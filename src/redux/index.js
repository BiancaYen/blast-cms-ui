import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// Reducers
import reducer from './reducers';

// Middleware
import apiMiddleware from './middleware/apiMiddleware';

let middleware = applyMiddleware(thunk, apiMiddleware);

if (process.env.NODE_ENV === 'development') {
    middleware = composeWithDevTools(applyMiddleware(thunk, apiMiddleware));
}

export default createStore(reducer, middleware);
