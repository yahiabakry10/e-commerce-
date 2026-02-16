import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Category } from '../../../shared/models/category/category.interface';
import { ProductsService } from '../../../core/services/products-service/products.service';

@Component({
  selector: 'app-categories',
  imports: [TranslatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  //=== services inject ===//
  private readonly products_service = inject(ProductsService);
  private readonly router = inject(Router);

  //=== signals ===//
  categories = signal<Category[]>([]);

  //=== Methods ===//
  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.products_service.getCategories().subscribe((res) => this.categories.set(res.data));
  }

  navigateToProductCategories(categoryId: string): void {
    this.router.navigate(['/products'], { queryParams: { categoryId } });
  }
}
