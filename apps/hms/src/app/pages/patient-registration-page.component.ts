import { Component } from '@angular/core';
import { PageTemplateComponent } from './page-template.component';

@Component({
  selector: 'app-patient-registration',
  standalone: true,
  imports: [PageTemplateComponent],
  template: `
    <app-page-template
      title="Patient Registration"
      description="Register a new patient in the system">
      <div class="form-content">
        <p style="font-size: 1.125rem; color: #73818f; text-align: center; padding: 3rem;">
          📋 Patient Registration Form<br><br>
          <span style="font-size: 0.875rem;">This is a mock page. Patient registration form will be implemented here.</span>
        </p>
      </div>
    </app-page-template>
  `,
  styles: [`
    .form-content {
      min-height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class PatientRegistrationPageComponent {}

