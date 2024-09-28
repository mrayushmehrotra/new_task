// src/redux/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit'; // Import from Redux Toolkit
import { thunk } from 'redux-thunk'; // Correctly import thunk as a named export
import { composeWithDevTools } from 'redux-devtools-extension';
import ProductReducer from './reducers/ProductReducer'; // Default import
import CategoryReducer from './reducers/CategoryReducer'; // Default import

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
    productData: ProductReducer,
    categoryData: CategoryReducer,
});

// Create the Redux store with the root reducer and middleware
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Apply thunk middleware
    devTools: process.env.NODE_ENV !== 'production', // Enable devTools in non-production mode
});

export default store; // Default export of the store
