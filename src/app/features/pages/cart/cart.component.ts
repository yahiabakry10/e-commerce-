import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { CartService } from './services/cart-service/cart.service';
import { CartDetails } from './models/cart-details/cart-details.interface';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  // ===== Services Inject ===== //
  private readonly cartService = inject(CartService);
  private readonly platformId = inject(PLATFORM_ID);

  // ===== signals ===== //
  cartList: WritableSignal<CartDetails> = signal<CartDetails>({} as CartDetails);

  // ===== Methods ===== //
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('userToken');
      if (token) {
        this.getLoggedUserCart();
      }
    }
  }

  getLoggedUserCart(): void {
    this.cartService.getLoggedUserCart().subscribe((res) => {
      if (res.status === 'success') {
        this.cartList.set(res.data);
        console.log(this.cartList());
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
