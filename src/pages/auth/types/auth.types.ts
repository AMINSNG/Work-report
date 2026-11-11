export interface LoginFormData {
  username: string;
  password: string;
  rememberMe?: boolean;
}
export type LoginResponse = {
  access_token: string;
  token_type: string;
};
