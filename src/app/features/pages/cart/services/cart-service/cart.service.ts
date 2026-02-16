import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { CartDetailsResponse } from '../../models/cart-details/cart-details.interface';
import { OrderDetailsResponse } from '../../models/order-details/order-details.interface';
import { CashDataResponse } from '../../models/cash-data/cash-data.interface';
import { AllordersDataResponse } from '../../models/allorders-data/allorders-data.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // ================= Services inject ================= //
  private readonly httpClient = inject(HttpClient);
  private readonly plat_id = inject(PLATFORM_ID);

  // ================= Properties ================= //
  private baseUrl: string = environment.apiUrl;
  private baseUrl2: string = 'https://ecommerce.routemisr.com/api/v2/';

  // ================= signals ================= //
  cartCount: WritableSignal<number> = signal<number>(0);

  // ================ Cart ================= //
  addProductToCart(id: string): Observable<CartDetailsResponse> {
    return this.httpClient.post<CartDetailsResponse>(`${this.baseUrl2}cart`, {
      productId: id,
    });
  }

  getLoggedUserCart(): Observable<CartDetailsResponse> {
    return this.httpClient.get<CartDetailsResponse>(`${this.baseUrl2}cart`);
  }

  removeSpecificCartItem(id: string): Observable<CartDetailsResponse> {
    return this.httpClient.delete<CartDetailsResponse>(`${this.baseUrl2}cart/${id}`);
  }

  updateCartProductQuantity(id: string, count: number): Observable<CartDetailsResponse> {
    return this.httpClient.put<CartDetailsResponse>(`${this.baseUrl2}cart/${id}`, {
      count: count,
    });
  }

  clearCart(): void {
    this.cartCount.set(0);
  }

  // ================= Orders ================= //
  checkoutSession(cartId: string | null, formData: object): Observable<OrderDetailsResponse> {
    let returnUrl = '';
    if (isPlatformBrowser(this.plat_id)) {
      returnUrl = window.location.origin;
    }
    return this.httpClient.post<OrderDetailsResponse>(
      `${this.baseUrl}orders/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`,
      formData,
    );
  }

  // ================ Cash Order from Cart V2 ================= //
  createCashOrder(id: string | null, formData: object): Observable<CashDataResponse> {
    return this.httpClient.post<CashDataResponse>(`${this.baseUrl2}orders/${id}`, formData);
  }

  getUserOrders(id: string): Observable<AllordersDataResponse> {
    return this.httpClient.get<AllordersDataResponse>(`${this.baseUrl}orders/user/${id}`);
  }
}
