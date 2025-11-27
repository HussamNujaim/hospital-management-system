import { Component } from '@angular/core';
import { PageTemplateComponent } from './page-template.component';

@Component({
  selector: 'app-staff-reports',
  standalone: true,
  imports: [PageTemplateComponent],
  template: `
    <app-page-template
      title="Staff Performance"
      description="Monitor staff performance and productivity">
      <div style="text-align: center; padding: 3rem; color: #73818f;">
        <div style="font-size: 4rem; margin-bottom: 1rem;">👥</div>
        <h3>Staff Performance Reports</h3>
        <p>Track staff productivity, attendance, and performance metrics.</p>
      </div>
    </app-page-template>
  `
})
export class StaffReportsPageComponent {}

