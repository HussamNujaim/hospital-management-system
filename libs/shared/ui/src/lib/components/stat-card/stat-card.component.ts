import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCard } from '../../interfaces';

/**
 * Stat Card Component
 * Displays key metrics and KPIs with trend indicators
 */
@Component({
  selector: 'hms-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatCardComponent {
  Math = Math;
  stat = input.required<StatCard>();
}

