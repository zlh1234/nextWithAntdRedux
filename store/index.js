import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export function initializeStore (initialState = {}) {
    return createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
}