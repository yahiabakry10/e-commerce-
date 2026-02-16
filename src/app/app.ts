import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { FlowbiteService } from './core/services/flowbite-service/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { WishlistService } from './features/pages/wishlist/services/wishlist-service/wishlist.service';
import { isPlatformBrowser } from '@angular/common';
import { WishlistData } from './features/pages/wishlist/models/wishlist-data/wishlist-data.interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('e-commerce');
  private readonly flowbiteService = inject(FlowbiteService);
  private readonly wishlistService = inject(WishlistService);
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('userToken');
      if (token) {
        this.initializeWishlist();
      }
    }

    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  initializeWishlist(): void {
    this.wishlistService.getLoggedUserWishlist().subscribe((res) => {
      if (res.status === 'success') {
        const ids = res.data.map((item: WishlistData) => item._id);
        this.wishlistService.wishlistIds.set(ids);
        this.wishlistService.wishlistCount.set(res.count);
      }
    });
  }
}
