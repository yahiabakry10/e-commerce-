import { Location } from '@angular/common';
import { Component, computed, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, NavbarComponent, FooterComponent, TranslatePipe],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  private readonly location = inject(Location);
  private readonly authService = inject(AuthService);

  isUserLoggedIn: Signal<boolean> = computed(() => this.authService.isLoggedIn());

  goBack() {
    this.location.back();
  }
}
