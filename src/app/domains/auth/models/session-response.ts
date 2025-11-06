export interface SessionResponse {
  isAuthenticated: boolean;
  username: string | null;
  userId: string | null;
}
