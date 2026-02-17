import {
  Component,
  computed,
  inject,
  OnInit,
  PLATFORM_ID,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { CartService } from './services/cart-service/cart.service';
import { CartDetails } from './models/cart-details/cart-details.interface';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth-service/auth.service';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  // ===== Services Inject ===== //
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);
  private readonly platformId = inject(PLATFORM_ID);

  // ===== signals ===== //
  cartList: WritableSignal<CartDetails> = signal<CartDetails>({} as CartDetails);
  isUserLoggedIn: Signal<boolean> = computed(() => !!this.authService.userData());

  // ===== Methods ===== //
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.authService.userData()) {
        this.getLoggedUserCart();
      }
    }
  }

  getLoggedUserCart(): void {
    this.cartService.getLoggedUserCart().subscribe((res) => {
      if (res.status === 'success') {
        this.cartList.set(res.data);
      }
    });
  }

  removeSpecificCartItem(id: string): void {
    this.cartService.removeSpecificCartItem(id).subscribe((res) => {
      if (res.status === 'success') {
        this.cartService.cartCount.set(res.numOfCartItems);
        this.cartList.set(res.data);
      }
    });
  }

  updateCartProductQuantity(id: string, count: number): void {
    this.cartService.updateCartProductQuantity(id, count).subscribe((res) => {
      if (res.status === 'success') {
        this.cartService.cartCount.set(res.numOfCartItems);
        this.cartList.set(res.data);
      }
    });
  }
}
