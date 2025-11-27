import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-wrapper">
      <div class="content-card">
        <h1>About</h1>
        <p>Hospital Management System - Version 1.0.0</p>
        <div class="info-section">
          <h2>Features</h2>
          <ul>
            <li>Patient Management</li>
            <li>Appointment Scheduling</li>
            <li>Electronic Medical Records (EMR)</li>
            <li>Billing & Accounting</li>
            <li>Staff Management</li>
            <li>Reporting & Analytics</li>
          </ul>
        </div>
        <div class="info-section">
          <h2>Technology Stack</h2>
          <ul>
            <li>Angular 20</li>
            <li>Nx Monorepo</li>
            <li>Syncfusion Components</li>
            <li>Tailwind CSS</li>
          </ul>
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

    h2 {
      color: #23282c;
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }

    p {
      color: #73818f;
      margin-bottom: 2rem;
    }

    .info-section {
      margin-top: 2rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      padding: 0.5rem 0;
      color: #5c6873;
      border-bottom: 1px solid #e4e5e6;
    }

    li:before {
      content: "✓ ";
      color: #20a8d8;
      font-weight: bold;
      margin-right: 0.5rem;
    }
  `]
})
export class AboutPageComponent {}

