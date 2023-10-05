// authActions.ts
import { Dispatch } from 'redux';
import { User, AuthAction, AuthState } from './interfaces';

export const login = (userData: User) => (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: 'LOGIN', payload: userData });
};

export const logout = () => (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: 'LOGOUT' });
};

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

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

export default authReducer;