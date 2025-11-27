import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-wrapper">
      <div class="content-card">
        <h1>Settings</h1>
        <p>Manage your application settings and preferences.</p>
        <div class="settings-section">
          <h2>General Settings</h2>
          <div class="setting-item">
            <label>Theme</label>
            <select class="setting-input">
              <option>Light</option>
              <option>Dark</option>
              <option>Auto</option>
            </select>
          </div>
          <div class="setting-item">
            <label>Language</label>
            <select class="setting-input">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <div class="setting-item">
            <label>Time Zone</label>
            <select class="setting-input">
              <option>UTC</option>
              <option>EST</option>
              <option>PST</option>
            </select>
          </div>
        </div>
        <div class="settings-section">
          <h2>Notification Settings</h2>
          <div class="setting-item">
            <label>
              <input type="checkbox" checked> Email notifications
            </label>
          </div>
          <div class="setting-item">
            <label>
              <input type="checkbox"> SMS notifications
            </label>
          </div>
          <div class="setting-item">
            <label>
              <input type="checkbox" checked> Push notifications
            </label>
          </div>
        </div>
        <div class="button-group">
          <button class="btn btn-primary">Save Changes</button>
          <button class="btn btn-secondary">Cancel</button>
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
      margin-top: 0;
    }

    p {
      color: #73818f;
      margin-bottom: 2rem;
    }

    .settings-section {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e4e5e6;
    }

    .setting-item {
      margin-bottom: 1.5rem;
    }

    .setting-item label {
      display: block;
      color: #5c6873;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .setting-input {
      width: 100%;
      max-width: 400px;
      padding: 0.5rem;
      border: 1px solid #c8ced3;
      border-radius: 0.25rem;
      font-size: 0.875rem;
    }

    .button-group {
      margin-top: 2rem;
      display: flex;
      gap: 1rem;
    }

    .btn {
      padding: 0.5rem 1.5rem;
      border: none;
      border-radius: 0.25rem;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.15s;
    }

    .btn-primary {
      background-color: #20a8d8;
      color: white;
    }

    .btn-primary:hover {
      background-color: #1b8eb7;
    }

    .btn-secondary {
      background-color: #c8ced3;
      color: #23282c;
    }

    .btn-secondary:hover {
      background-color: #b0b8be;
    }

    input[type="checkbox"] {
      margin-right: 0.5rem;
    }
  `]
})
export class SettingsPageComponent {}

