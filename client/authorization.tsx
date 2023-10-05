import { User, AuthState, AuthAction, LOGIN, LOGOUT } from './interfaces';

import { configureStore } from '@reduxjs/toolkit'

// Actions
export const login = (userData: User): AuthAction => ({
    type: LOGIN,
    payload: userData,
});
  export const logout = (): AuthAction => ({
    type: LOGOUT,
});


// Initial State
const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};


// Reducer
const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
        return {
            ...state,
            user: action.payload,
            isAuthenticated: true,
        };
        case 'LOGOUT':
        return {
            ...state,
            user: null,
            isAuthenticated: false,
        };
        default:
        return state;
    }
};


// Store
const store = configureStore({
    reducer: authReducer
  });

export default store;