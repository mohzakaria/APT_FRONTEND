import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer, {initialState as userInitialState} from './userslice.js';
import expireReducer from 'redux-persist-expire';
import {
    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist/es/constants';

const persistConfig = {
    key: 'root',
    storage,
    transforms: [
        expireReducer('user', {
            expireSeconds: 60 * 60 * 24,
            expiredState: userInitialState,
            autoExpire: true,
        }),
    ],
};

const reducer = combineReducers({
    user: rootReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    devTools: process.env.NODE_ENV !== 'production',
});
export default store;