import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthHeaderComponent } from '../../../shared/components/auth-header/auth-header.component';
import { CartService } from '../cart/services/cart-service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, AuthHeaderComponent, TranslatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  // ================ Services inject ================= //
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  // ================ Form ================= //
  checkoutForm!: FormGroup;

  // ================ signals ===================== //
  isVisaLoading: WritableSignal<boolean> = signal<boolean>(false);
  isCashLoading: WritableSignal<boolean> = signal<boolean>(false);
  cartId: WritableSignal<string | null> = signal<string | null>(null);

  // ================ Methods ================== //
  ngOnInit(): void {
    this.initiateCheckoutForm();
    this.getCartId();
  }

  getCartId(): void {
    this.cartId.set(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  initiateCheckoutForm(): void {
    this.checkoutForm = this.formBuilder.group({
      shippingAddress: this.formBuilder.group({
        details: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
        city: [null, [Validators.required]],
        postalCode: [null, [Validators.required, Validators.pattern(/^[0-9]{4,6}$/)]],
      }),
    });
  }

  payWithVisa(): void {
    if (this.checkoutForm.invalid || !this.cartId()) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
    this.isVisaLoading.set(true);

    this.cartService.checkoutSession(this.cartId(), this.checkoutForm.value).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartService.clearCart();
          window.open(res.session.url, '_self');
        }
      },
      error: () => {
        this.isVisaLoading.set(false);
        this.toastr.error('Something went wrong. Please try again.');
      },
    });
  }

  payWithCash(): void {
    if (this.checkoutForm.invalid || !this.cartId()) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
    this.isCashLoading.set(true);

    this.cartService.createCashOrder(this.cartId(), this.checkoutForm.value).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartService.clearCart();
          this.toastr.success(
            'Your order has been placed successfully. Pay on delivery.',
            'Order Confirmed',
          );
          this.router.navigate(['/allorders']);
        }
      },
      error: () => {
        this.isCashLoading.set(false);
        this.toastr.error('Something went wrong. Please try again.');
      },
    });
  }
}
