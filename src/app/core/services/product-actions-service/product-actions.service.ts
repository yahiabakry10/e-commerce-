import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../../features/pages/cart/services/cart-service/cart.service';
import { WishlistService } from '../../../features/pages/wishlist/services/wishlist-service/wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ProductActionsService {
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);

  addProductToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe((res) => {
      if (res.status === 'success') {
        this.cartService.cartCount.set(res.numOfCartItems);
        this.toastrService.success(res.message, 'Elevate Cart');
      }
    });
  }

  toggleWishlist(id: string): void {
    const isFav = this.wishlistService.wishlistIds().includes(id);

    if (isFav) {
      this.removeProductFromWishlist(id);
    } else {
      this.addProductToWishlist(id);
    }
  }

  addProductToWishlist(id: string): void {
    this.wishlistService.addProductToWishlist(id).subscribe((res) => {
      if (res.status === 'success') {
        this.wishlistService.wishlistIds.update((oldIds) => [...oldIds, id]);
        this.wishlistService.wishlistCount.update((val) => val + 1);
        this.toastrService.success(res.message, 'Elevate Wishlist');
      }
    });
  }

  removeProductFromWishlist(id: string): void {
    this.wishlistService.removeProductFromWishlist(id).subscribe((res) => {
      if (res.status === 'success') {
        this.wishlistService.wishlistIds.update((oldIds) =>
          oldIds.filter((itemId) => itemId !== id),
        );
        this.wishlistService.wishlistCount.update((val) => val - 1);
        this.toastrService.success(res.message, 'Elevate Wishlist');
      }
    });
  }
}
