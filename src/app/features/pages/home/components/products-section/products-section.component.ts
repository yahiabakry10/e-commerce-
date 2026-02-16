import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../../../../core/services/products-service/products.service';
import { ProductsData } from '../../../../../shared/models/products/products-data.interface';
import { ProductCardComponent } from '../../../../../shared/components/product-card/product-card.component';
import { HomeHeaderComponent } from '../../../../../shared/components/home-header/home-header.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products-section',
  imports: [ProductCardComponent, HomeHeaderComponent, TranslatePipe],
  templateUrl: './products-section.component.html',
  styleUrl: './products-section.component.css',
})
export class ProductsSectionComponent {
  private readonly products_service = inject(ProductsService);
  products = signal<ProductsData[]>([]);

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.products_service.getProducts().subscribe(res => this.products.set(res.data));
  }
}
