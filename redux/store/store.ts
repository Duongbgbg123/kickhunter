import { createStore, combineReducers, applyMiddleware } from 'redux';
import { homeReducer } from '../feature/home/reducer';
import { prodReducer } from '../feature/products/reducer';
import { authReducer } from '../feature/auth/reducer';
import { cartReducer } from '../feature/cart/reducer';
import { favouriteReducer } from '../feature/favourite/reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  homeReducer,
  prodReducer,
  authReducer,
  cartReducer,
  favouriteReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
