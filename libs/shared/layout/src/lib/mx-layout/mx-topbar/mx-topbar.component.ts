import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBarModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'mx-topbar',
  standalone: true,
  imports: [CommonModule, AppBarModule],
  templateUrl: './mx-topbar.component.html',
  styleUrls: ['./mx-topbar.component.scss'],
})
export class MxTopbarComponent {
  @Input() title = 'Dashboard';
  @Input() userInfo?: { name: string; avatar?: string };
  @Output() menuToggle = new EventEmitter<void>();


  onMenuToggle(event?: MouseEvent) {
    // Stop event propagation to prevent backdrop/document click detection
    if (event) {
      event.stopPropagation();
    }
    this.menuToggle.emit();
  }
}
