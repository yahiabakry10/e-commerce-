import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Results } from '../../../shared/models/results/results.interface';
import { Category } from '../../../shared/models/category/category.interface';
import { Brand } from '../../../shared/models/brand/brand.interface';
import { ProductsData } from '../../../shared/models/products/products-data.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient);
  private baseUrl: string = environment.apiUrl;

  getCategories(): Observable<Results<Category[]>> {
    return this.httpClient.get<Results<Category[]>>(`${this.baseUrl}categories`);
  }

  // ================ Get only brands that have related products ================== //
  getActiveBrands(): Observable<Brand[]> {
    return forkJoin({
      brands: this.httpClient.get<{ data: Brand[] }>(`${this.baseUrl}brands`),
      products: this.httpClient.get<{ data: ProductsData[] }>(`${this.baseUrl}products`),
    }).pipe(
      map(({ brands, products }) => {
        const activeBrandIds = new Set(products.data.map((p) => p.brand._id));
        return brands.data.filter((brand) => activeBrandIds.has(brand._id));
      }),
    );
  }

  getProducts(
    catId?: string,
    page?: number,
    brandId?: string,
    minPrice?: number,
    maxPrice?: number,
    sort: string = 'price',
  ): Observable<Results<ProductsData[]>> {
    let params = new HttpParams().set('limit', '10').set('sort', sort);
    if (catId) {
      params = params.set('category[in]', catId);
    }
    if (page !== undefined) {
      params = params.set('page', page);
    }
    if (brandId) {
      params = params.set('brand', brandId);
    }
    if (minPrice !== undefined) {
      params = params.set('price[gte]', minPrice);
    }
    if (maxPrice !== undefined) {
      params = params.set('price[lte]', maxPrice);
    }
    return this.httpClient.get<Results<ProductsData[]>>(`${this.baseUrl}products`, { params });
  }
}
