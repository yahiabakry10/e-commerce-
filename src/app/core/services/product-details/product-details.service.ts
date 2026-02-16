import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ProductsData } from '../../../shared/models/products/products-data.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  private readonly httpClient = inject(HttpClient);
  private baseUrl: string = environment.apiUrl;

  getProductDetails(id: string | null): Observable<{ data: ProductsData }> {
    return this.httpClient.get<{ data: ProductsData }>(`${this.baseUrl}products/${id}`);
  }
}
