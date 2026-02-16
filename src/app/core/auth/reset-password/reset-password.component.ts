import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { ResetPasswordData } from '../../../shared/models/signin/signin.interface';
import { AuthHeaderComponent } from '../../../shared/components/auth-header/auth-header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, AuthHeaderComponent, TranslatePipe],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  // ================ Properties ================= //
  authSubscription!: Subscription;

  // ================ Services inject ============= //
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  // ================ Form ===================== //
  resetPasswordForm!: FormGroup;

  // ================ signals ========== //
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  isTypeText: WritableSignal<boolean> = signal<boolean>(false);

  // ================ Methods ================== //
  ngOnInit(): void {
    this.initializeResetPasswordForm();
    this.prefillEmail();
  }

  initializeResetPasswordForm(): void {
    this.resetPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      newPassword: [
        null,
        [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)],
      ],
    });
  }

  onSubmitResetPasswordForm(): void {
    this.authSubscription?.unsubscribe();
    if (this.resetPasswordForm.valid) {
      this.isLoading.set(true);
      const data: ResetPasswordData = this.resetPasswordForm.getRawValue();
      this.authSubscription = this.authService.resetPassword(data).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          localStorage.setItem('userToken', res.token);
          this.authService.decodeUserData();
          this.router.navigate(['/home']);
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }

  prefillEmail(): void {
    const email = this.activatedRoute.snapshot.queryParams['email'] || '';
    if (email) {
      this.resetPasswordForm.patchValue({ email: email });
      this.resetPasswordForm.get('email')?.disable();
    }
  }
}
