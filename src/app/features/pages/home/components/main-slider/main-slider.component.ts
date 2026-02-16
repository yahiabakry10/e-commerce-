import { Component, signal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Slider } from '../../../../../shared/models/slider/slider.interface';

@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css',
})
export class MainSliderComponent {
  slider = signal<Slider[]>([
    { id: '1', image: '/images/img2.avif' },
    { id: '2', image: '/images/img7.avif' },
    { id: '3', image: '/images/img3.avif' },
    { id: '4', image: '/images/img6.avif' },
  ]);

  responsiveOptions = signal([
    {
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '0px',
      numVisible: 1,
      numScroll: 1
    }
  ]);
}
