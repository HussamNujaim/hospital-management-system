import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-wrapper">
      <div class="content-card">
        <h1>Main Dashboard</h1>
        <p>Welcome to the Hospital Management System main dashboard.</p>
        <div class="stats-grid">
          <div class="stat-card">
            <h3>Total Patients</h3>
            <p class="stat-value">1,234</p>
          </div>
          <div class="stat-card">
            <h3>Appointments</h3>
            <p class="stat-value">56</p>
          </div>
          <div class="stat-card">
            <h3>Staff</h3>
            <p class="stat-value">89</p>
          </div>
          <div class="stat-card">
            <h3>Departments</h3>
            <p class="stat-value">12</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-wrapper {
      width: 100%;
    }

    .content-card {
      background: white;
      padding: 2rem;
      border-radius: 0.25rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    h1 {
      margin: 0 0 0.5rem 0;
      color: #23282c;
      font-size: 1.75rem;
    }

    p {
      color: #73818f;
      margin-bottom: 2rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .stat-card {
      background: #f0f3f5;
      padding: 1.5rem;
      border-radius: 0.25rem;
      text-align: center;
    }

    .stat-card h3 {
      margin: 0 0 0.5rem 0;
      color: #5c6873;
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .stat-value {
      margin: 0;
      color: #20a8d8;
      font-size: 2rem;
      font-weight: 700;
    }
  `]
})
export class MainPageComponent {}

