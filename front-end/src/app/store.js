import { configureStore } from '@reduxjs/toolkit';
import loginDataReducer from '../features/loginData/loginDataSplice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, loginDataReducer)

export const store = configureStore({
    reducer: persistedReducer,
    // devTools: process.env.NODE_ENV !== 'production',
    middleware: []
});

export const persistor = persistStore(store);