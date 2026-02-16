import { Component } from '@angular/core';
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../../../shared/components/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css',
})
export class UserLayoutComponent {
  
}
