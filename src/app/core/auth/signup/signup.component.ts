import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { Registerdata } from '../../../shared/models/register/register.interface';
import { Subscription } from 'rxjs';
import { AuthHeaderComponent } from '../../../shared/components/auth-header/auth-header.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule, AuthHeaderComponent, TranslatePipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  // ================ Properties ================= //
  authSubscription!: Subscription;

  // ================ Services inject ============= //
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly routerService = inject(Router);

  // ================ Form ===================== //
  registerForm!: FormGroup;

  // ================ signals ========== //
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  isTypeText: WritableSignal<boolean> = signal<boolean>(false);
  isTypeText2: WritableSignal<boolean> = signal<boolean>(false);

  // ================ Methods ================== //
  ngOnInit(): void {
    this.initiateSignupForm();
  }

  initiateSignupForm(): void {
    this.registerForm = this.fb.group(
      {
        name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
        email: [null, [Validators.required, Validators.email]],
        password: [
          null,
          [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)],
        ],
        rePassword: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      },
      { validators: this.confirmPassword },
    );
  }

  confirmPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;
    if (password === rePassword) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  register(): void {
    this.authSubscription?.unsubscribe();
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      const userData: Registerdata = this.registerForm.value;
      this.authSubscription = this.authService.registerData(userData).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          localStorage.setItem('userToken', res.token);
          this.authService.decodeUserData();
          this.routerService.navigate(['/home']).then(() => {
            this.registerForm.reset();
          });
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
