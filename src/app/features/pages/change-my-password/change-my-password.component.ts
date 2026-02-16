import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthHeaderComponent } from '../../../shared/components/auth-header/auth-header.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-my-password',
  imports: [ReactiveFormsModule, AuthHeaderComponent, TranslatePipe],
  templateUrl: './change-my-password.component.html',
  styleUrl: './change-my-password.component.css',
})
export class ChangeMyPasswordComponent implements OnInit {
  // ================ Properties ================= //
  authSubscription!: Subscription;

  // ================ Services inject ============= //
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  // ================ Form ===================== //
  changePasswordForm!: FormGroup;

  // ================ signals ========== //
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  isTypeText: WritableSignal<boolean> = signal<boolean>(false);
  isTypeText2: WritableSignal<boolean> = signal<boolean>(false);
  isTypeText3: WritableSignal<boolean> = signal<boolean>(false);

  // ================ Methods ================== //
  ngOnInit(): void {
    this.initiateChangePasswordForm();
  }

  initiateChangePasswordForm(): void {
    this.changePasswordForm = this.formBuilder.group(
      {
        currentPassword: [
          null,
          [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)],
        ],
        password: [
          null,
          [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)],
        ],
        rePassword: [null, [Validators.required]],
      },
      {
        validators: this.confirmPassword,
      },
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

  onSubmitChangePassword(): void {
    this.authSubscription?.unsubscribe();
    if (this.changePasswordForm.valid) {
      this.isLoading.set(true);
      const changePassData = this.changePasswordForm.value;
      this.authSubscription = this.authService.updateLoggedUserPassword(changePassData).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading.set(false);
          localStorage.setItem('userToken', res.token);
          this.authService.decodeUserData();
          this.toastr.success('Password updated successfully!', 'Elevate');
          this.router.navigate(['/home']).then(() => {
            this.changePasswordForm.reset();
          });
        },
        error: (err) => {
          this.isLoading.set(false);
          const apiError = err.error?.errors?.msg;
          if (apiError === 'Incorrect current password') {
            this.changePasswordForm.get('currentPassword')?.setErrors({ serverError: true });
          }
        },
      });
    }
  }
}
