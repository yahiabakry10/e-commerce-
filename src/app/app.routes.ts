import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth-guard';
import { guestGuard } from './core/guards/guest/guest-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    loadComponent: () =>
      import('../app/core/layouts/components/guest-layout/guest-layout.component').then(
        (c) => c.GuestLayoutComponent,
      ),
    canActivate: [guestGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('../app/core/auth/login/login.component').then((c) => c.LoginComponent),
        title: 'Login',
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('../app/core/auth/signup/signup.component').then((c) => c.SignupComponent),
        title: 'Register',
      },
      {
        path: 'forgot-passwords',
        loadComponent: () =>
          import('../app/core/auth/forgot-passwords/forgot-passwords.component').then(
            (c) => c.ForgotPasswordsComponent,
          ),
        title: 'Forgot Password',
      },
      {
        path: 'verify-reset-code',
        loadComponent: () =>
          import('../app/core/auth/verify-reset-code/verify-reset-code.component').then(
            (c) => c.VerifyResetCodeComponent,
          ),
        title: 'Verify Reset Code',
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('../app/core/auth/reset-password/reset-password.component').then(
            (c) => c.ResetPasswordComponent,
          ),
        title: 'Reset Password',
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('../app/core/layouts/components/user-layout/user-layout.component').then(
        (c) => c.UserLayoutComponent,
      ),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/pages/home/home.component').then((c) => c.HomeComponent),
        title: 'Home',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/pages/products/products.component').then((c) => c.ProductsComponent),
        title: 'Products',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/pages/categories/categories.component').then(
            (c) => c.CategoriesComponent,
          ),
        title: 'Categories',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/pages/brands/brands.component').then((c) => c.BrandsComponent),
        title: 'Brands',
      },
      {
        path: 'product-details/:id',
        loadComponent: () =>
          import('./features/pages/product-details/product-details.component').then(
            (c) => c.ProductDetailsComponent,
          ),
        title: 'Product Details',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/pages/cart/cart.component').then((c) => c.CartComponent),
        title: 'Cart',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./features/pages/wishlist/wishlist.component').then((c) => c.WishlistComponent),
        title: 'Wishlist',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./features/pages/checkout/checkout.component').then((c) => c.CheckoutComponent),
        canActivate: [authGuard],
        title: 'Checkout',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./features/pages/allorders/allorders.component').then(
            (c) => c.AllordersComponent,
          ),
        canActivate: [authGuard],
        title: 'Orders',
      },
      {
        path: 'change-my-password',
        loadComponent: () =>
          import('./features/pages/change-my-password/change-my-password.component').then(
            (c) => c.ChangeMyPasswordComponent,
          ),
        canActivate: [authGuard],
        title: 'Change Password',
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/pages/not-found/not-found.component').then((c) => c.NotFoundComponent),
    title: 'Error',
  },
];
