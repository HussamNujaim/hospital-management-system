import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarModule, SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { MxTopbarComponent } from './mx-topbar/mx-topbar.component';
import { NavItem } from '../models/nav-item.interface';

@Component({
  selector: 'mx-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarModule, MxTopbarComponent],
  templateUrl: './mx-layout.component.html',
  styleUrl: './mx-layout.component.scss',
})
export class MxLayoutComponent implements OnInit {
  @Input() navItems: NavItem[] = [];
  @Input() title = 'Dashboard';
  @Input() userInfo?: { name: string; avatar?: string };

  @ViewChild('sidebar') sidebar!: SidebarComponent;

  // Syncfusion Sidebar Properties
  public isSidebarOpen = true;
  public isDocked = false; // Track if sidebar is in mini/docked mode
  public sidebarType: 'Push' | 'Over' | 'Slide' | 'Auto' = 'Auto'; // Auto switches between Push (desktop) and Over (mobile)
  public sidebarWidth = '250px';
  public dockSize = '60px'; // Mini sidebar width
  public mediaQuery = '(min-width: 992px)'; // Breakpoint for desktop vs mobile
  public closeOnDocumentClick = false; // Disabled to prevent conflicts with toggle button

  // Getter to check if we're on mobile
  get isMobile(): boolean {
    return typeof window !== 'undefined' && window.innerWidth < 992;
  }

  // Check if sidebar is in docked/mini mode by inspecting Syncfusion's DOM class
  private updateDockedState(): void {
    if (this.sidebar && this.sidebar.element) {
      // Syncfusion adds 'e-dock' class when in docked mode
      this.isDocked = this.sidebar.element.classList.contains('e-dock');
    }
  }

  ngOnInit(): void {
    // Default navigation items if none provided
    if (this.navItems.length === 0) {
      this.navItems = [
        { id: 'main', label: 'Main', icon: 'e-icons e-home', route: '/main' },
      ];
    }
  }

  onSidebarCreated(): void {
    // Sidebar is ready - Initialize state based on screen size
    if (this.sidebar) {
      if (this.isMobile) {
        this.sidebar.hide();
        this.isSidebarOpen = false;
      } else {
        this.sidebar.show();
        this.isSidebarOpen = true;
      }
      // Check initial docked state
      setTimeout(() => this.updateDockedState(), 100);
    }
  }

  onSidebarClose(): void {
    // Sync state when Syncfusion closes the sidebar
    this.isSidebarOpen = false;
    this.updateDockedState();
  }

  onSidebarOpen(): void {
    // Sync state when Syncfusion opens the sidebar
    this.isSidebarOpen = true;
    this.updateDockedState();
  }

  onMenuToggle(): void {
    // Toggle sidebar open/close using Syncfusion's toggle method
    if (this.sidebar) {
      this.sidebar.toggle();
      // Update docked state after toggle (with small delay for DOM update)
      setTimeout(() => this.updateDockedState(), 50);
    }
  }

  closeSidebar(): void {
    // Close sidebar (used by backdrop click)
    if (this.sidebar) {
      this.sidebar.hide();
    }
  }

  onSidebarItemClick(item: NavItem): void {
    console.log('Navigation item clicked:', item);

    // Close sidebar on mobile after navigation for better UX
    if (this.isMobile) {
      this.closeSidebar();
    }
  }
}
