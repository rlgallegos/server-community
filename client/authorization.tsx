// authActions.ts
import { Dispatch } from 'redux';
import { User, AuthAction } from './interfaces';

export const login = (userData: User) => (dispatch: Dispatch<AuthAction>) => {
    // ... your login logic
    dispatch({ type: 'LOGIN', payload: userData });
};

export const logout = () => (dispatch: Dispatch<AuthAction>) => {
    // ... your logout logic
    dispatch({ type: 'LOGOUT' });
};

// authReducer.ts
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

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