import { Component } from '@angular/core';
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../../../shared/components/footer/footer.component";

@Component({
  selector: 'app-guest-layout',
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './guest-layout.component.html',
  styleUrl: './guest-layout.component.css',
})
export class GuestLayoutComponent {

}
