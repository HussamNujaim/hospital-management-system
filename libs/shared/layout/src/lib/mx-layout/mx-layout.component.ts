import { Component, Input, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MxSidebarComponent } from './mx-sidebar/mx-sidebar.component';
import { MxTopbarComponent } from './mx-topbar/mx-topbar.component';
import { NavItem } from '../models/nav-item.interface';

@Component({
  selector: 'mx-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MxSidebarComponent, MxTopbarComponent],
  templateUrl: './mx-layout.component.html',
  styleUrl: './mx-layout.component.scss',
})
export class MxLayoutComponent implements OnInit, OnDestroy {
  @Input() navItems: NavItem[] = [];
  @Input() title = 'Dashboard';
  @Input() userInfo?: { name: string; avatar?: string };

  public isSidebarOpen = true;
  public isSidebarCollapsed = false; // Mini/Dock mode
  public isMobile = false;

  private mediaQuery: MediaQueryList | null = null;
  private mediaQueryListener: ((e: MediaQueryListEvent) => void) | null = null;

  ngOnInit(): void {
    // Default navigation items if none provided
    if (this.navItems.length === 0) {
      this.navItems = [
        { id: 'main', label: 'Main', icon: 'e-icons e-home', route: '/main' },
        { id: 'about', label: 'About', icon: 'e-icons e-info', route: '/about' },
        { id: 'settings', label: 'Settings', icon: 'e-icons e-settings', route: '/settings' },
      ];
    }

    // Setup responsive behavior using matchMedia
    this.setupResponsiveLayout();
  }

  ngOnDestroy(): void {
    // Cleanup media query listener
    if (this.mediaQuery && this.mediaQueryListener) {
      this.mediaQuery.removeEventListener('change', this.mediaQueryListener);
    }
  }

  private setupResponsiveLayout(): void {
    if (typeof window !== 'undefined') {
      this.mediaQuery = window.matchMedia('(max-width: 992px)');

      // Initial check
      this.handleMediaQueryChange(this.mediaQuery);

      // Listen for changes
      this.mediaQueryListener = (e: MediaQueryListEvent) => this.handleMediaQueryChange(e);
      this.mediaQuery.addEventListener('change', this.mediaQueryListener);
    }
  }

  private handleMediaQueryChange(event: MediaQueryList | MediaQueryListEvent): void {
    this.isMobile = event.matches;

    if (this.isMobile) {
      // Mobile/Tablet: Default to collapsed (mini) mode, hidden initially
      this.isSidebarCollapsed = true;
      this.isSidebarOpen = false;
    } else {
      // Desktop: Default to expanded mode
      this.isSidebarCollapsed = false;
      this.isSidebarOpen = true;
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    // Trigger responsive check on window resize as fallback
    if (this.mediaQuery) {
      this.handleMediaQueryChange(this.mediaQuery);
    }
  }

  onMenuToggle(): void {
    if (this.isMobile) {
      // On mobile, toggle between hidden and visible (always mini)
      this.isSidebarOpen = !this.isSidebarOpen;
    } else {
      // On desktop, toggle between expanded and mini mode
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
  }

  onSidebarItemClick(item: NavItem): void {
    console.log('Navigation item clicked:', item);

    // On mobile, hide sidebar after navigation
    if (this.isMobile) {
      this.isSidebarOpen = false;
    }
  }
}
