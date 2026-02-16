import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { CartService } from '../cart/services/cart-service/cart.service';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import { CurrencyPipe, DatePipe, isPlatformBrowser, TitleCasePipe } from '@angular/common';
import { AllordersData } from '../cart/models/allorders-data/allorders-data.interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-allorders',
  imports: [DatePipe, TitleCasePipe, CurrencyPipe, TranslatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {
  // ===== Service Inject ===== //
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);
  private readonly platformId = inject(PLATFORM_ID);

  // ===== signals ===== //
  allordersList: WritableSignal<AllordersData[]> = signal<AllordersData[]>([]);

  // ===== Methods ===== //
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.decodeUserData();
      const userId = this.authService.userData()?.id;
      console.log(userId);
      if (userId) {
        this.getUserOrders(userId);
      }
    }
  }

  getUserOrders(id: string): void {
    this.cartService.getUserOrders(id).subscribe({
      next: (res) => {
        this.allordersList.set(res);
        console.log(this.allordersList());
      },
    });
  }
}
