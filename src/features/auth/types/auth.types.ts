export interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}
export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    username: string;
  };
}
