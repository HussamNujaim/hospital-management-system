import { Component } from '@angular/core';
import { PageTemplateComponent } from './page-template.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PageTemplateComponent],
  template: `
    <app-page-template
      title="Dashboard"
      description="Welcome to the Hospital Management System">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
        <div class="stat-card">
          <div class="stat-icon" style="background: #20a8d8;">👥</div>
          <div class="stat-content">
            <h3>Total Patients</h3>
            <p class="stat-number">1,248</p>
            <span class="stat-change positive">+12% from last month</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: #4dbd74;">📅</div>
          <div class="stat-content">
            <h3>Appointments Today</h3>
            <p class="stat-number">34</p>
            <span class="stat-change positive">+5 from yesterday</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: #ffc107;">📁</div>
          <div class="stat-content">
            <h3>Medical Records</h3>
            <p class="stat-number">5,892</p>
            <span class="stat-change neutral">Updated today</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: #f86c6b;">💰</div>
          <div class="stat-content">
            <h3>Revenue (MTD)</h3>
            <p class="stat-number">$248,500</p>
            <span class="stat-change positive">+8% from last month</span>
          </div>
        </div>
      </div>
    </app-page-template>
  `,
  styles: [`
    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      color: white;
    }

    .stat-content {
      flex: 1;
    }

    .stat-content h3 {
      margin: 0 0 0.5rem 0;
      font-size: 0.875rem;
      color: #73818f;
      font-weight: 500;
    }

    .stat-number {
      margin: 0 0 0.25rem 0;
      font-size: 1.75rem;
      font-weight: 700;
      color: #23282c;
    }

    .stat-change {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
    }

    .stat-change.positive {
      background: #e8f8f0;
      color: #4dbd74;
    }

    .stat-change.neutral {
      background: #f0f3f5;
      color: #73818f;
    }
  `]
})
export class DashboardPageComponent {}

