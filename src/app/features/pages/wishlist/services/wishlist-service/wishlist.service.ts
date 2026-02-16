import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { WishlistResponse } from '../../models/wishlist/wishlist.interface';
import { WishlistDataResponse } from '../../models/wishlist-data/wishlist-data.interface';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  // ===== Services Inject ===== //
  private readonly httpClient = inject(HttpClient);

  private baseUrl: string = environment.apiUrl;

  // ===== signal ===== //
  wishlistCount: WritableSignal<number> = signal<number>(0);
  wishlistIds: WritableSignal<string[]> = signal<string[]>([]);

  // ===== Methods ===== //
  addProductToWishlist(id: string): Observable<WishlistResponse> {
    return this.httpClient.post<WishlistResponse>(`${this.baseUrl}wishlist`, {
      productId: id,
    });
  }

  removeProductFromWishlist(id: string): Observable<WishlistResponse> {
    return this.httpClient.delete<WishlistResponse>(`${this.baseUrl}wishlist/${id}`);
  }

  getLoggedUserWishlist(): Observable<WishlistDataResponse> {
    return this.httpClient.get<WishlistDataResponse>(`${this.baseUrl}wishlist`);
  }
}
