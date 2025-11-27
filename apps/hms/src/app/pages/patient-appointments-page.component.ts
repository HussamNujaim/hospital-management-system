import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTemplateComponent } from './page-template.component';

@Component({
  selector: 'app-patient-appointments',
  standalone: true,
  imports: [CommonModule, PageTemplateComponent],
  template: `
    <app-page-template
      title="Appointments"
      description="Manage patient appointments and schedules">
      <div class="appointments-grid">
        <div class="appointment-card" *ngFor="let apt of mockAppointments">
          <div class="appointment-time">{{ apt.time }}</div>
          <div class="appointment-details">
            <h4>{{ apt.patient }}</h4>
            <p>{{ apt.doctor }} • {{ apt.department }}</p>
            <span class="appointment-type">{{ apt.type }}</span>
          </div>
        </div>
      </div>
    </app-page-template>
  `,
  styles: [`
    .appointments-grid {
      display: grid;
      gap: 1rem;
    }

    .appointment-card {
      display: flex;
      gap: 1.5rem;
      padding: 1.5rem;
      background: white;
      border-left: 4px solid #20a8d8;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }

    .appointment-card:hover {
      transform: translateX(4px);
    }

    .appointment-time {
      font-size: 1.5rem;
      font-weight: 700;
      color: #20a8d8;
      min-width: 80px;
    }

    .appointment-details h4 {
      margin: 0 0 0.5rem 0;
      color: #23282c;
    }

    .appointment-details p {
      margin: 0 0 0.5rem 0;
      color: #73818f;
      font-size: 0.875rem;
    }

    .appointment-type {
      background: #e8f8f0;
      color: #4dbd74;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
    }
  `]
})
export class PatientAppointmentsPageComponent {
  mockAppointments = [
    { time: '09:00', patient: 'John Smith', doctor: 'Dr. Williams', department: 'Cardiology', type: 'Check-up' },
    { time: '10:30', patient: 'Sarah Johnson', doctor: 'Dr. Brown', department: 'Pediatrics', type: 'Consultation' },
    { time: '14:00', patient: 'Michael Brown', doctor: 'Dr. Davis', department: 'Orthopedics', type: 'Follow-up' },
    { time: '15:30', patient: 'Emily Davis', doctor: 'Dr. Wilson', department: 'General', type: 'Check-up' },
  ];
}

