import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavItem } from '../../models/nav-item.interface';

@Component({
  selector: 'mx-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mx-sidebar.component.html',
  styleUrls: ['./mx-sidebar.component.scss'],
})
export class MxSidebarComponent {
  @Input() items: NavItem[] = [];
  @Input() isOpen = true;
  @Input() isCollapsed = false; // Mini/Dock mode (icons only)
  @Output() itemClick = new EventEmitter<NavItem>();


  onItemClick(item: NavItem) {
    this.itemClick.emit(item);
  }
}
