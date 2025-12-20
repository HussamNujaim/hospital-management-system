import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { NavItem } from '../../interfaces';

/**
 * Layout Component
 * Main layout shell with sidebar, header, and content area
 * Uses ng-content for flexible content projection
 */
@Component({
  selector: 'hms-layout',
  standalone: true,
  imports: [CommonModule, SidebarComponent, ThemeToggleComponent],
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  // Sidebar inputs
  navItems = input.required<NavItem[]>();
  isSidebarCollapsed = input.required<boolean>();
  activePageId = input.required<string>();

  // User info
  userName = input<string>('Dr. Julian Vance');
  userRole = input<string>('Chief Admin');
  userAvatar = input<string>('https://api.dicebear.com/7.x/avataaars/svg?seed=Felix');

  // Header inputs
  pageTitle = input.required<string>();
  subtitle = input<string>('MedCore Command Center');
  searchPlaceholder = input<string>('Quick Search...');

  // Theme
  isDarkMode = input.required<boolean>();

  // Outputs
  sidebarToggle = output<void>();
  pageChange = output<string>();
  themeToggle = output<boolean>();
}

