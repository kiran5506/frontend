'use client';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth-slice';
import generateReducer from './features/generate-slice';
import vendorAuthReducer from './features/vendor-auth-slice';
import todoReducer from './features/todo-slice';
import userReducer from './features/user-slice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import slider from './features/slider-slice';
import vendorRouter from './features/vendor-slice';

const vendorPersistConfig = {
  key: 'vendor',
  storage: storage,
  whitelist: ['vendorState', 'token', 'isAuthenticated', 'vendorid', 'role'],
};

const generatePersistConfig = (key) => ({
  key: key,
  storage: storage,
  whitelist: ['authState', 'genToken', 'isAuthenticated'],
});

// Combine reducers
const appReducer = combineReducers({
  vendorAuth: persistReducer(vendorPersistConfig, vendorAuthReducer),
  generatetoken: persistReducer(generatePersistConfig('genauth'), generateReducer),
  todo: todoReducer,
  //user: userReducer,
  slider: slider,
  vendorauth: vendorRouter,
});

// Root Reducer to reset the state on logout action
const rootReducer = (state, action) => {
  if (action.type === 'vendorauth/logout') {
    storage.removeItem("persist:vendor");
    localStorage.removeItem('token');
    setTimeout(() => {
      window.location.href = "/vendor";
    }, 500);
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

// Configure the store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializableCheck to avoid issues with persist storage
    }),
});