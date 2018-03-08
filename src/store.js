import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { loadAuthToken } from './local-storage';
import authReducer from './reducers/auth';
import projectManagerReducer from './reducers/project-manager';
import { setAuthToken } from './actions/auth';

const store = createStore(
    combineReducers({
        projectManager: projectManagerReducer,
        auth: authReducer
    }),
    applyMiddleware(thunk)
);

const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
}

export default store;
