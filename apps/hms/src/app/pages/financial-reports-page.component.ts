import { Component } from '@angular/core';
import { PageTemplateComponent } from './page-template.component';

@Component({
  selector: 'app-financial-reports',
  standalone: true,
  imports: [PageTemplateComponent],
  template: `
    <app-page-template
      title="Financial Reports"
      description="View financial performance and revenue reports">
      <div style="text-align: center; padding: 3rem; color: #73818f;">
        <div style="font-size: 4rem; margin-bottom: 1rem;">💰</div>
        <h3>Financial Reports</h3>
        <p>Track revenue, expenses, and financial performance metrics.</p>
      </div>
    </app-page-template>
  `
})
export class FinancialReportsPageComponent {}

