
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule, ItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'mx-topbar',
  standalone: true,
  imports: [CommonModule, ToolbarModule],
  templateUrl: './mx-topbar.component.html',
  styleUrl: './mx-topbar.component.scss',
})
export class MxTopbarComponent {
  @Output() menuToggle = new EventEmitter<void>();

  public toolbarItems: ItemModel[] = [
    { prefixIcon: 'e-icons e-menu', tooltipText: 'Menu', align: 'Left', click: () => this.menuToggle.emit() },
    { type: 'Separator' },
    // Add other toolbar items here
  ];
}
