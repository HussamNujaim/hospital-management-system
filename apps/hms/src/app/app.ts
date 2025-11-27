import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MxLayoutComponent, NavItem } from '@shared/layout';

@Component({
  standalone: true,
  imports: [RouterModule, MxLayoutComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  title = 'Hospital Management System';

  navItems: NavItem[] = [
    {
      id: 'main',
      label: 'Home',
      icon: 'e-icons e-home',
      route: '/main',
    },
    {
      id: 'about',
      label: 'About',
      icon: 'e-icons e-connect',
      route: '/about',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'e-icons e-settings',
      route: '/settings',
    },
  ];

  userInfo = {
    name: 'John Doe',
    avatar: 'https://via.placeholder.com/32',
  };
}
