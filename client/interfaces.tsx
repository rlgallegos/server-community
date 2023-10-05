

export interface User {
    id: number;
    username: string;
    email: string;
  }
  export interface AuthAction {
    type: string; // Use string literals for action types
    payload?: any; // Payload can be any data associated with the action
}