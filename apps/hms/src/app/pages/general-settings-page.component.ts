import { Component } from '@angular/core';
import { PageTemplateComponent } from './page-template.component';

@Component({
  selector: 'app-general-settings',
  standalone: true,
  imports: [PageTemplateComponent],
  template: `
    <app-page-template
      title="General Settings"
      description="Configure general system settings">
      <div style="text-align: center; padding: 3rem; color: #73818f;">
        <div style="font-size: 4rem; margin-bottom: 1rem;">⚙️</div>
        <h3>General Settings</h3>
        <p>Configure system preferences, defaults, and general options.</p>
      </div>
    </app-page-template>
  `
})
export class GeneralSettingsPageComponent {}

