import { Component } from '@angular/core';
import { PageTemplateComponent } from './page-template.component';

@Component({
  selector: 'app-patient-statistics',
  standalone: true,
  imports: [PageTemplateComponent],
  template: `
    <app-page-template
      title="Patient Statistics"
      description="Analyze patient data and trends">
      <div style="text-align: center; padding: 3rem; color: #73818f;">
        <div style="font-size: 4rem; margin-bottom: 1rem;">📊</div>
        <h3>Patient Statistics</h3>
        <p>View patient demographics, visit patterns, and outcome statistics.</p>
      </div>
    </app-page-template>
  `
})
export class PatientStatisticsPageComponent {}

