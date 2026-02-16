import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AuthHeaderComponent } from '../../../shared/components/auth-header/auth-header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { ResetCodeData } from '../../../shared/models/signin/signin.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verify-reset-code',
  imports: [ReactiveFormsModule, AuthHeaderComponent, TranslatePipe],
  templateUrl: './verify-reset-code.component.html',
  styleUrl: './verify-reset-code.component.css',
})
export class VerifyResetCodeComponent {
  // ================ Properties ================= //
  authSubscription!: Subscription;

  // ================ Services inject ============= //
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  // ================ Form ===================== //
  verifyCodeForm!: FormGroup;

  // ================ signals ========== //
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  userEmail: WritableSignal<string> = signal<string>('');

  // ================ Methods ================== //
  ngOnInit(): void {
    this.initializeResetCodeForm();
    this.getUserEmail();
  }

  initializeResetCodeForm(): void {
    this.verifyCodeForm = this.formBuilder.group({
      resetCode: [null, [Validators.required, Validators.pattern(/^[0-9]{4,6}$/)]],
    });
  }

  onSubmitResetCodeForm(): void {
    this.authSubscription?.unsubscribe();
    if (this.verifyCodeForm.valid) {
      this.isLoading.set(true);
      const data: ResetCodeData = this.verifyCodeForm.value;
      this.authSubscription = this.authService.verifyResetCode(data).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['reset-password'], { queryParams: { email: this.userEmail() } });
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
    } else {
      this.verifyCodeForm.markAllAsTouched();
    }
  }

  getUserEmail(): void {
    this.userEmail.set(this.activatedRoute.snapshot.queryParams['email'] || '');
  }
}
