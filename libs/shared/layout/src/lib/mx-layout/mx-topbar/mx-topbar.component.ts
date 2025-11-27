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
  @Input() isSidebarOpen: boolean = false;
  @Output() menuToggle = new EventEmitter<void>();

  public isMobile: boolean = window.innerWidth < 992;

  constructor() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  private handleResize() {
    this.isMobile = window.innerWidth < 992;
  }

  onMenuToggle() {
    this.menuToggle.emit();
  }
}
