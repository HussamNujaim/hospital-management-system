import { Component, ChangeDetectionStrategy, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItem } from '../../interfaces';

/**
 * Sidebar Component
 * Collapsible sidebar with nested navigation
 * Supports both accordion (expanded) and flyout (collapsed) modes
 */
@Component({
  selector: 'hms-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  // Inputs
  navItems = input.required<NavItem[]>();
  isCollapsed = input.required<boolean>();
  activePageId = input.required<string>();
  userName = input<string>('Dr. Julian Vance');
  userRole = input<string>('Chief Admin');
  userAvatar = input<string>('https://api.dicebear.com/7.x/avataaars/svg?seed=Felix');

  // Outputs
  toggleCollapse = output<void>();
  pageChange = output<string>();

  // Internal state for accordion
  private openMenus = signal<Set<string>>(new Set(['patients']));

  handleMenuClick(item: NavItem) {
    if (item.children) {
      if (!this.isCollapsed()) {
        this.toggleMenu(item.id);
      }
    } else {
      this.pageChange.emit(item.id);
    }
  }

  toggleMenu(id: string) {
    const newSet = new Set(this.openMenus());
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    this.openMenus.set(newSet);
  }

  isMenuOpen(id: string): boolean {
    return this.openMenus().has(id);
  }

  isParentActive(item: NavItem): boolean {
    return item.children?.some(c => c.id === this.activePageId()) || false;
  }
}

