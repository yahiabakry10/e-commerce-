import { Component, input } from '@angular/core';
import { Brand } from '../../models/brand/brand.interface';

@Component({
  selector: 'app-brands-card',
  imports: [],
  templateUrl: './brands-card.component.html',
  styleUrl: './brands-card.component.css',
})
export class BrandsCardComponent {
  brand = input<Brand | null>(null);
}
