import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../../../../core/services/products-service/products.service';
import { Category } from '../../../../../shared/models/category/category.interface';
import { CategoryCardComponent } from '../../../../../shared/components/category-card/category-card.component';
import { CarouselModule } from 'primeng/carousel';
import { Router } from '@angular/router';
import { HomeHeaderComponent } from '../../../../../shared/components/home-header/home-header.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categories-section',
  imports: [CategoryCardComponent, CarouselModule, HomeHeaderComponent, TranslatePipe],
  templateUrl: './categories-section.component.html',
  styleUrl: './categories-section.component.css',
})
export class CategoriesSectionComponent {
  //=== services inject ===//
  private readonly products_service = inject(ProductsService);
  private readonly router = inject(Router);

  //=== signals ===//
  categories = signal<Category[]>([]);
  
  responsiveOptions = signal([
    {
      breakpoint: '1280px',
      numVisible: 6,
      numScroll: 2
    },
    {
      breakpoint: '1024px',
      numVisible: 5,
      numScroll: 2
    },
    {
      breakpoint: '768px',
      numVisible: 4,
      numScroll: 2
    },
    {
      breakpoint: '640px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '0px',
      numVisible: 2,
      numScroll: 3
    }
  ]);

  //=== Methods ===//
  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.products_service.getCategories().subscribe(res=> this.categories.set(res.data)); 
  }

  navigateToProductCategories(categoryId: string): void {
    this.router.navigate(['/products'], { queryParams: { categoryId } });
  }
}
