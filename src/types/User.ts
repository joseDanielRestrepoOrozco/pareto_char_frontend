export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthUser {
  user: User | null;
  isAuthenticated: boolean;
}
