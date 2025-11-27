import { Component } from '@angular/core';
import { PageTemplateComponent } from './page-template.component';

@Component({
  selector: 'app-prescriptions',
  standalone: true,
  imports: [PageTemplateComponent],
  template: `
    <app-page-template
      title="Prescriptions"
      description="Manage patient prescriptions and medications">
      <div style="text-align: center; padding: 3rem; color: #73818f;">
        <div style="font-size: 4rem; margin-bottom: 1rem;">💊</div>
        <h3>Prescription Management</h3>
        <p>Create, view, and manage patient prescriptions and medication orders.</p>
      </div>
    </app-page-template>
  `
})
export class PrescriptionsPageComponent {}

