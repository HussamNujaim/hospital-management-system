import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTemplateComponent } from './page-template.component';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, PageTemplateComponent],
  template: `
    <app-page-template
      title="Patient List"
      description="View and manage all registered patients">
      <div class="mock-table">
        <div class="table-header">
          <div>ID</div>
          <div>Name</div>
          <div>Age</div>
          <div>Gender</div>
          <div>Last Visit</div>
          <div>Status</div>
        </div>
        <div class="table-row" *ngFor="let patient of mockPatients">
          <div>{{ patient.id }}</div>
          <div><strong>{{ patient.name }}</strong></div>
          <div>{{ patient.age }}</div>
          <div>{{ patient.gender }}</div>
          <div>{{ patient.lastVisit }}</div>
          <div><span class="status-badge" [class]="patient.status">{{ patient.status }}</span></div>
        </div>
      </div>
    </app-page-template>
  `,
  styles: [`
    .mock-table {
      width: 100%;
    }

    .table-header, .table-row {
      display: grid;
      grid-template-columns: 80px 1fr 80px 100px 150px 120px;
      gap: 1rem;
      padding: 1rem;
      align-items: center;
    }

    .table-header {
      background: #f0f3f5;
      font-weight: 600;
      color: #23282c;
      border-radius: 4px;
    }

    .table-row {
      border-bottom: 1px solid #e4e5e6;
      transition: background 0.2s;
    }

    .table-row:hover {
      background: #f8f9fa;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-badge.Active {
      background: #e8f8f0;
      color: #4dbd74;
    }

    .status-badge.Follow-up {
      background: #fff3cd;
      color: #f86c6b;
    }
  `]
})
export class PatientListPageComponent {
  mockPatients = [
    { id: 'P001', name: 'John Smith', age: 45, gender: 'Male', lastVisit: '2024-11-25', status: 'Active' },
    { id: 'P002', name: 'Sarah Johnson', age: 32, gender: 'Female', lastVisit: '2024-11-24', status: 'Follow-up' },
    { id: 'P003', name: 'Michael Brown', age: 58, gender: 'Male', lastVisit: '2024-11-23', status: 'Active' },
    { id: 'P004', name: 'Emily Davis', age: 27, gender: 'Female', lastVisit: '2024-11-22', status: 'Active' },
    { id: 'P005', name: 'Robert Wilson', age: 63, gender: 'Male', lastVisit: '2024-11-20', status: 'Follow-up' },
  ];
}

