import { Component, computed, inject, input, signal, WritableSignal } from '@angular/core';
import { ProductsData } from '../../models/products/products-data.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { WishlistService } from '../../../features/pages/wishlist/services/wishlist-service/wishlist.service';
import { WishlistData } from '../../../features/pages/wishlist/models/wishlist-data/wishlist-data.interface';
import { ProductActionsService } from '../../../core/services/product-actions-service/product-actions.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CurrencyPipe, TranslatePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  product = input<ProductsData | WishlistData | null>(null);

  // ===== Services Inject ===== //
  protected readonly productActionService = inject(ProductActionsService);
  private readonly wishlistService = inject(WishlistService);

  isInWishlist = computed(() => {
    const product = this.product();
    if (!product) return false;
    return this.wishlistService.wishlistIds().includes(product._id);
  });

  addProductToCart(id: string): void {
    this.productActionService.addProductToCart(id);
  }

  toggleWishlist(id: string): void {
    this.productActionService.toggleWishlist(id);
  }
}
