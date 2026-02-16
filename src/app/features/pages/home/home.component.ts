import { Component } from '@angular/core';
import { ProductsSectionComponent } from './components/products-section/products-section.component';
import { CategoriesSectionComponent } from './components/categories-section/categories-section.component';
import { MainSliderComponent } from './components/main-slider/main-slider.component';

@Component({
  selector: 'app-home',
  imports: [
    ProductsSectionComponent,
    CategoriesSectionComponent,
    MainSliderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
