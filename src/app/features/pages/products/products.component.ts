import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../../core/services/products-service/products.service';
import { ProductsData, ProductsQueryParams } from '../../../shared/models/products/products-data.interface';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { Category } from '../../../shared/models/category/category.interface';
import { Brand } from '../../../shared/models/brand/brand.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent, PaginatorModule, TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  //=== Services inject ===//
  private readonly products_service = inject(ProductsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  //=== Signals ===//
  products = signal<ProductsData[]>([]);
  categories = signal<Category[]>([]);
  brands = signal<Brand[]>([]);
  categoryId = signal<string | undefined>(undefined);
  brandId = signal<string | undefined>(undefined);
  currentSort = signal<string>('price');
  totalRecords = signal<number>(0);
  rowsPerPage = signal<number>(10);
  first = signal<number>(0);
  currentPage = signal<number>(1);

  //=== Methods ===//
  ngOnInit(): void {
    this.getCategories();
    this.loadActiveBrands();

    this.activatedRoute.queryParams.subscribe((params) => {
      const catId = params['categoryId'] || undefined;
      const page = params['page'] ? parseInt(params['page']) : 1;
      const sort = params['sort'] || 'price';
      const brandId = params['brandId'] || undefined;

      this.categoryId.set(catId);
      this.brandId.set(brandId);
      this.currentSort.set(sort);
      this.currentPage.set(page);
      this.first.set((page - 1) * this.rowsPerPage());

      this.fetchProducts(catId, page, brandId, sort);
    });
  }

  fetchProducts(catId?: string, page?: number, brandId?: string, sort: string = 'price'): void {
    this.products_service
      .getProducts(catId, page, brandId, undefined, undefined, sort)
      .subscribe((res) => {
        this.products.set(res.data);
        this.totalRecords.set(res.results);
      });
  }

  getCategories(): void {
    this.products_service.getCategories().subscribe((res) => {
      this.categories.set(res.data);
    });
  }

  loadActiveBrands(): void {
    this.products_service.getActiveBrands().subscribe((filteredBrands) => {
      this.brands.set(filteredBrands);
    });
  }

  private updateUrl(params: Partial<ProductsQueryParams>): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  filterByCategory(catId?: string): void {
    this.updateUrl({ categoryId: catId, page: 1, brandId: undefined });
  }

  filterByBrand(brandId?: string): void {
    this.updateUrl({ brandId: brandId, page: 1, categoryId: undefined });
  }

  sortProducts(event: Event): void {
    const sortOption = (event.target as HTMLSelectElement).value;
    this.updateUrl({ sort: sortOption, page: 1 });
  }

  onPageChange(event: PaginatorState) {
    const page = (event.page ?? 0) + 1;
    this.updateUrl({ page: page });
  }
}
