import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductDetailsService } from '../../../core/services/product-details/product-details.service';
import { ProductsData } from '../../../shared/models/products/products-data.interface';
import { CurrencyPipe } from '@angular/common';
import { WishlistService } from '../wishlist/services/wishlist-service/wishlist.service';
import { ProductActionsService } from '../../../core/services/product-actions-service/product-actions.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, CurrencyPipe, TranslatePipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  //=== Services inject ===//
  private readonly product_details_service = inject(ProductDetailsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  protected readonly productactionsService = inject(ProductActionsService);
  private readonly wishlistService = inject(WishlistService);

  //=== Signals ===//
  productId = signal<string | null>(null);
  product = signal<ProductsData | null>(null);
  isInWishlist = computed(() => {
    const product = this.product();
    if (!product) return false;
    return this.wishlistService.wishlistIds().includes(product._id);
  });

  //=== Methods ===//
  ngOnInit(): void {
    this.getProductId();
  }

  getProductId(): void {
    this.productId.set(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getProductDetails(this.productId());
  }

  getProductDetails(id: string | null): void {
    this.product_details_service
      .getProductDetails(id)
      .subscribe((res) => this.product.set(res.data));
  }

  addProductToCart(id: string): void {
    this.productactionsService.addProductToCart(id);
  }

  toggleWishlist(id: string): void {
    this.productactionsService.toggleWishlist(id);
  }
}
