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
export interface Message {
    text: string,
    user: string,
    timeStamp: number
}
export interface TipStatistic {
    id: number
    day_of_week: string,
    day_night: string,
    role: string,
    average_tip: number,
    num_tips: number,
}
export interface Tip {
    id: number,
    dat_night: string,
    tip_date: Date,
    tip_time: Date,
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
