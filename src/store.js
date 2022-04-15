import rootReducer from './redux/rootReducer';
import thunk from 'redux-thunk';
import { tokenMiddleware } from './middleware';
import { createStore, applyMiddleware  } from 'redux';

const store = createStore(rootReducer, applyMiddleware(thunk, tokenMiddleware));

export default store;