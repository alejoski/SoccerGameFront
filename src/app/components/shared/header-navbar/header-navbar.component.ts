import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './header-navbar.component.html',
  styleUrl: './header-navbar.component.css',
})
export class HeaderNavbarComponent {
  title = 'SoccerGameFront';
  menuOption: string = 'home';

  onOption(option: string) {
    this.menuOption = option;
  }
}
