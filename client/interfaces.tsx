export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export interface User {
    id: number;
    email: string;
    google_id: string;
    image: string;
    name: string;
    restaurant: string | null;
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
