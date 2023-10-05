

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
  
export interface AuthAction {
    type: string; // Use string literals for action types
    payload?: any; // Payload can be any data associated with the action
}