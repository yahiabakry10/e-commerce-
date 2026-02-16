export interface Register {
  message: string;
  user: User;
  token: string;
}

interface User {
  name: string;
  email: string;
  role: string;
}

export interface Registerdata {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}
