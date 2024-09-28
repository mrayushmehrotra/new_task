// src/Redux/actions/ProductActions.js

// Define your action types
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

// Example action creator
export const fetchProducts = () => {
    return {
        type: FETCH_PRODUCTS_REQUEST,
        // Add additional payload if needed
    };
};
