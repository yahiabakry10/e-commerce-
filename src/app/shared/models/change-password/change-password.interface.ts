export interface ChangePassword {
  currentPassword: string;
  password: string;
  rePassword: string;
}

export interface UpdateLoggedUserPasswordResponse {
  message: string;
  user: User;
  token: string;
}

export interface User {
  name: string;
  email: string;
  role: string;
}
