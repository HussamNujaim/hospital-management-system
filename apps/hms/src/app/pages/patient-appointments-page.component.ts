import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-appointments-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-8">
      <h2 class="text-2xl font-black text-slate-800 dark:text-white mb-6">Patient Appointments</h2>
      <p class="text-slate-500 dark:text-slate-400">Appointment scheduling and management will be displayed here.</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientAppointmentsPageComponent {}

