import { Component, signal } from '@angular/core';
import { Payments } from '../../models/payments/payments.interface';
import { Stores } from '../../models/stores/stores.interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  paymentImages = signal<Payments[]>([
    { id: 'amazon-pay', image: '/images/amazon-pay.png' },
    { id: 'amex', image: '/images/American-Express-Color.png' },
    { id: 'paypal', image: '/images/paypal.png' },
    { id: 'mastercard', image: '/images/mastercard.webp' },
  ]);

  stores = signal<Stores[]>([
    { id: 'google-play', image: '/images/get-google-play.png' },
    { id: 'app-store', image: '/images/get-apple-store.png' },
  ]);
}
