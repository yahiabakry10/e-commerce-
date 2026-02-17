import {
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  PLATFORM_ID,
  Signal,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavLinks } from '../../models/nav-links/nav-links.interface';
import { AuthLinks } from '../../models/auth-links/auth-links.interface';
import { CartService } from '../../../features/pages/cart/services/cart-service/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { WishlistService } from '../../../features/pages/wishlist/services/wishlist-service/wishlist.service';
import { TranslatePipe } from '@ngx-translate/core';
import { DropdownLanguageComponent } from './components/dropdown-language/dropdown-language.component';
import { AuthService } from '../../../core/services/auth-service/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, DropdownLanguageComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  //=== Services inject ===///
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly authService = inject(AuthService);
  private readonly platformId = inject(PLATFORM_ID);

  //=== signals ===//
  isDropdownMenuOpened: WritableSignal<boolean> = signal<boolean>(false);
  isUser = computed(() => !!this.authService.userData());
  isOpened = signal<boolean>(false);
  collapseMenu = viewChild<ElementRef>('collapseMenu');
  menuHeight = signal<number>(0);
  navLinks = signal<NavLinks[]>([
    { name: 'Home', path: '/home' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'Brands', path: '/brands' },
  ]);
  authLinks = signal<AuthLinks[]>([
    { name: 'Login', path: '/login' },
    { name: 'Signup', path: '/signup' },
  ]);
  count_cart: Signal<number> = computed(() => this.cartService.cartCount());
  count_wishlist: Signal<number> = computed(() => this.wishlistService.wishlistCount());

  //=== Methods ===//
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('userToken');
      if (token) {
        this.getCartData();
        this.getWishlistData();
      }
    }
  }

  getCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems);
      },
    });
  }

  getWishlistData(): void {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishlistService.wishlistCount.set(res.count);
      },
    });
  }

  toggleDropdownMenu(): void {
    this.isDropdownMenuOpened.update((value) => !value);
  }

  closeDropdownMenu(): void {
    this.isDropdownMenuOpened.set(false);
  }

  toggleMenu(): void {
    this.isOpened.update((value) => !value);
    if (this.isOpened()) {
      const element = this.collapseMenu()?.nativeElement;
      this.menuHeight.set(element?.scrollHeight);
    } else {
      this.menuHeight.set(0);
    }
  }

  closeMenu(): void {
    this.isOpened.set(false);
    this.menuHeight.set(0);
  }

  signOut(): void {
    localStorage.removeItem('userToken');
    this.authService.userData.set(null);
    this.cartService.cartCount.set(0);
    this.wishlistService.wishlistCount.set(0);
    this.router.navigate(['/login']);
  }
}
