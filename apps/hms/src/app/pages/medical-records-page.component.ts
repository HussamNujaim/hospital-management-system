import { Component } from '@angular/core';
import { PageTemplateComponent } from './page-template.component';

@Component({
  selector: 'app-medical-records',
  standalone: true,
  imports: [PageTemplateComponent],
  template: `
    <app-page-template
      title="Medical Records"
      description="View and search patient medical records">
      <div style="text-align: center; padding: 3rem; color: #73818f;">
        <div style="font-size: 4rem; margin-bottom: 1rem;">📁</div>
        <h3>Medical Records System</h3>
        <p>Access patient medical history, test results, and clinical notes.</p>
      </div>
    </app-page-template>
  `
})
export class MedicalRecordsPageComponent {}

