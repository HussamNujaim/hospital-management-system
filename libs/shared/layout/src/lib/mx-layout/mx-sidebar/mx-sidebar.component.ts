
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule, SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'mx-sidebar',
  standalone: true,
  imports: [CommonModule, SidebarModule, TreeViewModule],
  templateUrl: './mx-sidebar.component.html',
  styleUrl: './mx-sidebar.component.scss',
})
export class MxSidebarComponent {
  @ViewChild('sidebar') sidebarInstance!: SidebarComponent;

  // Sample data for the TreeView
  public navItems: object[] = [
    {
      nodeId: '01',
      nodeText: 'Dashboard',
      iconCss: 'e-icons e-dashboard',
    },
    {
      nodeId: '02',
      nodeText: 'Appointments',
      iconCss: 'e-icons e-schedule',
    },
    {
      nodeId: '03',
      nodeText: 'Patients',
      iconCss: 'e-icons e-user',
    },
    {
      nodeId: '04',
      nodeText: 'Settings',
      iconCss: 'e-icons e-settings',
    },
  ];
  public field: object = { dataSource: this.navItems, id: 'nodeId', text: 'nodeText', iconCss: 'iconCss' };

  public toggle(): void {
    this.sidebarInstance.toggle();
  }
}
