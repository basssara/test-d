export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  sessionId: string;
  accessToken: string;
  refreshToken: string;
}
