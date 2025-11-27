import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-template',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>{{ title }}</h1>
        <p class="page-description">{{ description }}</p>
      </div>
      <div class="page-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 2rem;
      height: 100%;
      overflow-y: auto;
    }

    .page-header {
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #e4e5e6;
    }

    .page-header h1 {
      margin: 0 0 0.5rem 0;
      font-size: 2rem;
      font-weight: 600;
      color: #23282c;
    }

    .page-description {
      margin: 0;
      font-size: 1rem;
      color: #73818f;
    }

    .page-content {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      min-height: 400px;
    }
  `]
})
export class PageTemplateComponent {
  @Input() title = '';
  @Input() description = '';
}

