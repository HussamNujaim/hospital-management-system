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

  // Submenu expansion tracking
  public expandedItems: Set<string> = new Set(); // Track which parent items are expanded
  public accordionMode = false; // true = only one parent expanded at a time, false = multiple can be expanded

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
    // Navigation items should be provided by the app
  }

  onSidebarCreated(): void {
    // Sidebar is ready - Initialize state based on screen size
    if (this.sidebar) {
      if (this.isMobile) {
        this.sidebar.hide();
        this.isSidebarOpen = false;
        this.isDocked = false;
      } else {
        // Desktop: Start in expanded (not docked) mode
        this.sidebar.show();
        this.isSidebarOpen = true;
        this.isDocked = false;

        // Force remove the e-dock class if Syncfusion added it
        if (this.sidebar.element && this.sidebar.element.classList.contains('e-dock')) {
          this.sidebar.element.classList.remove('e-dock');
        }
      }

      // Check docked state after initialization
      setTimeout(() => {
        // On desktop, ensure we start NOT docked
        if (!this.isMobile && this.sidebar.element && this.sidebar.element.classList.contains('e-dock')) {
          this.sidebar.element.classList.remove('e-dock');
          this.isDocked = false;
        } else {
          this.updateDockedState();
        }
      }, 150);
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
    if (!this.sidebar) return;

    if (this.isMobile) {
      // Mobile: Toggle sidebar visibility (hide/show)
      this.sidebar.toggle();
      setTimeout(() => this.updateDockedState(), 50);
    } else {
      // Desktop: Toggle between expanded and docked mode
      if (this.isDocked) {
        // Currently docked (60px) -> Expand to full width (250px)
        if (this.sidebar.element) {
          this.sidebar.element.classList.remove('e-dock');
          this.isDocked = false;
        }
      } else {
        // Currently expanded (250px) -> Dock to mini mode (60px)
        if (this.sidebar.element) {
          this.sidebar.element.classList.add('e-dock');
          this.isDocked = true;
        }
      }
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

  toggleSubmenu(item: NavItem, event?: Event): void {
    // Prevent navigation if clicking on parent with children
    if (event && item.children && item.children.length > 0) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Don't toggle submenus when sidebar is docked
    if (this.isDocked) {
      return;
    }

    const itemId = item.id;

    if (this.accordionMode) {
      // Accordion mode: close others when opening one
      if (this.expandedItems.has(itemId)) {
        this.expandedItems.delete(itemId);
      } else {
        this.expandedItems.clear();
        this.expandedItems.add(itemId);
      }
    } else {
      // Non-accordion mode: toggle independently
      if (this.expandedItems.has(itemId)) {
        this.expandedItems.delete(itemId);
      } else {
        this.expandedItems.add(itemId);
      }
    }
  }

  isExpanded(itemId: string): boolean {
    return this.expandedItems.has(itemId);
  }
}
