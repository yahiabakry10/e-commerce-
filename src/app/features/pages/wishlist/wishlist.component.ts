import {
  Component,
  effect,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { WishlistService } from './services/wishlist-service/wishlist.service';
import { isPlatformBrowser } from '@angular/common';
import { WishlistData } from './models/wishlist-data/wishlist-data.interface';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  imports: [ProductCardComponent, TranslatePipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  // ===== Services inject ===== //
  private readonly wishlistService = inject(WishlistService);
  private readonly platformId = inject(PLATFORM_ID);

  // ===== signals ===== //
  wishlist_List: WritableSignal<WishlistData[]> = signal<WishlistData[]>([]);
  wishlistItems: WritableSignal<number> = signal<number>(0);

  constructor() {
    effect(() => {
      const wishlistIds = this.wishlistService.wishlistIds();

      this.wishlist_List.update((value) => value.filter((item) => wishlistIds.includes(item._id)));

      this.wishlistItems.set(wishlistIds.length);
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('userToken');
      if (token) {
        this.getLoggedUserWishlist();
      }
    }
  }

  getLoggedUserWishlist(): void {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.wishlistService.wishlistCount.set(res.count);
          this.wishlistItems.set(res.count);
          this.wishlist_List.set(res.data);

          const ids = res.data.map((item: WishlistData) => item._id);
          this.wishlistService.wishlistIds.set(ids);
        }
      },
    });
  }
}
