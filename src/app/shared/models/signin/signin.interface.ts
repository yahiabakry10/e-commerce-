export interface Signin {
  message: string;
  user: User;
  token: string;
}

interface User {
  name: string;
  email: string;
  role: string;
}

export interface Signindata extends ForgotPasswordData {
  password: string;
}

export interface ForgotPasswordResponse {
  statusMsg: string;
  message: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetCodeData {
  resetCode: string;
}

export interface ResetPasswordData extends ForgotPasswordData {
  newPassword: string
}

export interface userVerifyCodeResponse {
  status: string;
}

export interface userResetPasswordResponse {
  token: string;
}
