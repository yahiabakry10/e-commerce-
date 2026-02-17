import { HttpClient } from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
  PLATFORM_ID,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Register, Registerdata } from '../../../shared/models/register/register.interface';
import {
  ForgotPasswordData,
  ForgotPasswordResponse,
  ResetCodeData,
  ResetPasswordData,
  Signin,
  Signindata,
  userResetPasswordResponse,
  userVerifyCodeResponse,
} from '../../../shared/models/signin/signin.interface';
import { jwtDecode } from 'jwt-decode';
import { UserData } from '../../../shared/models/user-data/user-data.interface';
import { isPlatformBrowser } from '@angular/common';
import {
  ChangePassword,
  UpdateLoggedUserPasswordResponse,
} from '../../../shared/models/change-password/change-password.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // ===== Services Inject ===== //
  private readonly httpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  // ===== Properties ===== //
  private baseUrl: string = environment.apiUrl;

  // ===== Signals ===== //
  userData: WritableSignal<UserData | null> = signal<UserData | null>(null);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.decodeUserData();
    }
  }

  // ===== Methods ===== //
  registerData(data: Registerdata): Observable<Register> {
    return this.httpClient.post<Register>(`${this.baseUrl}auth/signup`, data);
  }

  loginData(data: Signindata): Observable<Signin> {
    return this.httpClient.post<Signin>(`${this.baseUrl}auth/signin`, data);
  }

  decodeUserData(): void {
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        const decoded: UserData = jwtDecode(token);
        this.userData.set(decoded);
      } catch (error) {
        console.error('Error decoding user data:', error);
        this.logout(); // Clear invalid token and user data
      }
    } else {
      this.userData.set(null);
    }
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this.userData.set(null);
  }

  forgotPassword(userData: ForgotPasswordData): Observable<ForgotPasswordResponse> {
    return this.httpClient.post<ForgotPasswordResponse>(
      `${this.baseUrl}auth/forgotPasswords`,
      userData,
    );
  }

  verifyResetCode(userResetCode: ResetCodeData): Observable<userVerifyCodeResponse> {
    return this.httpClient.post<userVerifyCodeResponse>(
      `${this.baseUrl}auth/verifyResetCode`,
      userResetCode,
    );
  }

  resetPassword(resetData: ResetPasswordData): Observable<userResetPasswordResponse> {
    return this.httpClient.put<userResetPasswordResponse>(
      `${this.baseUrl}auth/resetPassword`,
      resetData,
    );
  }

  updateLoggedUserPassword(data: ChangePassword): Observable<UpdateLoggedUserPasswordResponse> {
    return this.httpClient.put<UpdateLoggedUserPasswordResponse>(
      `${this.baseUrl}users/changeMyPassword`,
      data,
    );
  }
}
