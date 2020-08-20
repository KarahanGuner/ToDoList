import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/user.slice';

const reducers = combineReducers({
  userReducer
});

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['userReducer']
}

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
});
