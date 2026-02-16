import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('userToken');
    if (token) {
      if (req.url.includes('cart') || req.url.includes('orders') || req.url.includes('wishlist') || req.url.includes('users')) {
        req = req.clone({
          setHeaders: {
            token: token,
          },
        });
      }
    }
  }

  return next(req);
};
