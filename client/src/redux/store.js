import { configureStore,combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import {persistReducer} from 'redux-persist'
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';


const rootReducer = combineReducers({
  user:userReducer,
});

const presistConfig={
  key:'root',
  Storage,
  version:1,
}

const persistReducer = persistReducer(presistConfig,rootReducer)

export const store = configureStore({
  reducer: persistReducer,
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({serializableCheck:false}),
})

export const persisror = persistStore(store);