import { Component, inject, signal } from '@angular/core';
import { BrandsCardComponent } from '../../../shared/components/brands-card/brands-card.component';
import { Brand } from '../wishlist/models/wishlist-data/wishlist-data.interface';
import { Router } from '@angular/router';
import { ProductsService } from '../../../core/services/products-service/products.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  imports: [BrandsCardComponent, TranslatePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  private readonly products_service = inject(ProductsService);
  private readonly router = inject(Router);
  brands = signal<Brand[]>([]);

  ngOnInit() {
    this.loadActiveBrands();
  }

  loadActiveBrands(): void {
    this.products_service.getActiveBrands().subscribe((filteredBrands) => {
      this.brands.set(filteredBrands);
    });
  }

  navigateToProductsBrands(brandId: string): void {
    this.router.navigate(['/products'], { queryParams: { brandId } });
  }
}
