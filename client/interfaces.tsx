export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export interface Restaurant {
    id: number,
    name: string
}

export interface User {
    id: number;
    email: string;
    image: string;
    name: string;
    restaurant: Restaurant | null;
    restaurant_id: number | null;
    role: string | null;
}
  
export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}
  
export interface LoginAction {
    type: typeof LOGIN;
    payload: User;
}

export interface LogoutAction {
    type: typeof LOGOUT;
}

export type AuthAction = LoginAction | LogoutAction;
