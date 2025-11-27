import { Component } from '@angular/core';
import { PageTemplateComponent } from './page-template.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [PageTemplateComponent],
  template: `
    <app-page-template
      title="User Management"
      description="Manage system users and permissions">
      <div style="text-align: center; padding: 3rem; color: #73818f;">
        <div style="font-size: 4rem; margin-bottom: 1rem;">👤</div>
        <h3>User Management</h3>
        <p>Add, edit, and manage user accounts, roles, and permissions.</p>
      </div>
    </app-page-template>
  `
})
export class UserManagementPageComponent {}

