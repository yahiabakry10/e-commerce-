import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth.service';
import { Signindata } from '../../../shared/models/signin/signin.interface';
import { AuthHeaderComponent } from '../../../shared/components/auth-header/auth-header.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, AuthHeaderComponent, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  // ================ Properties ================= //
  authSubscription!: Subscription;

  // ================ Services inject ============= //
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  // ================ Form ===================== //
  loginForm!: FormGroup;

  // ================ signals ===================== //
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  isTypeText: WritableSignal<boolean> = signal<boolean>(false);

  // ================ Methods ================== //
  ngOnInit(): void {
    this.initiateLoginForm();
  }

  initiateLoginForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)],
      ],
    });
  }

  login(): void {
    this.authSubscription?.unsubscribe();
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      const userData: Signindata = this.loginForm.value;
      this.authSubscription = this.authService.loginData(userData).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          localStorage.setItem('userToken', res.token);
          this.authService.decodeUserData();
          this.router.navigate(['/home']).then(() => {
            this.loginForm.reset();
          });
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
