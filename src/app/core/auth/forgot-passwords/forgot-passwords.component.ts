import { ForgotPasswordData } from './../../../shared/models/signin/signin.interface';
import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { AuthHeaderComponent } from '../../../shared/components/auth-header/auth-header.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-passwords',
  imports: [ReactiveFormsModule, AuthHeaderComponent, TranslatePipe],
  templateUrl: './forgot-passwords.component.html',
  styleUrl: './forgot-passwords.component.css',
})
export class ForgotPasswordsComponent implements OnInit {
  // ================ Properties ================= //
  authSubscription!: Subscription;

  // ================ Services inject ============= //
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  // ================ Form ===================== //
  forgotPasswordForm!: FormGroup;

  // ================ signals ========== //
  isLoading: WritableSignal<boolean> = signal<boolean>(false);

  // ================ Methods ================== //
  ngOnInit(): void {
    this.initializeForgotPasswordForm();
  }

  initializeForgotPasswordForm(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  onSubmitForgotPasswordForm(): void {
    this.authSubscription?.unsubscribe();
    if (this.forgotPasswordForm.valid) {
      this.isLoading.set(true);
      const data: ForgotPasswordData = this.forgotPasswordForm.value;
      this.authSubscription = this.authService.forgotPassword(data).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/verify-reset-code'], { queryParams: { email: data.email } });
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}
