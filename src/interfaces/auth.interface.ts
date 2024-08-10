export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  accessToken: string;
  refreshToken: string;
}
