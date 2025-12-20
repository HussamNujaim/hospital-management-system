import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Theme Toggle Component
 * Reusable dark/light mode switch
 */
@Component({
  selector: 'hms-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent {
  isDarkMode = input.required<boolean>();
  toggle = output<boolean>();
}

