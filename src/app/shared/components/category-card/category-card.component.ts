import { Component, input } from '@angular/core';
import { Category } from '../../models/category/category.interface';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
})
export class CategoryCardComponent {
  category = input<Category | null>(null);
}
