
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MxTopbarComponent } from './mx-topbar/mx-topbar.component';
import { MxSidebarComponent } from './mx-sidebar/mx-sidebar.component';

@Component({
  selector: 'mx-layout',
  standalone: true,
  imports: [CommonModule, MxTopbarComponent, MxSidebarComponent],
  templateUrl: './mx-layout.component.html',
  styleUrl: './mx-layout.component.scss',
})
export class MxLayoutComponent {
  @ViewChild(MxSidebarComponent) sidebar!: MxSidebarComponent;

  onMenuToggle(): void {
    this.sidebar.toggle();
  }
}
