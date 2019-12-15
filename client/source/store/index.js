import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const logger = store => next => action => {
  next(action);
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunk, logger];
export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(...middlewares))
);
