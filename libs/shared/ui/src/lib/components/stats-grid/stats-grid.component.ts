import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../stat-card/stat-card.component';
import { StatCard } from '../../interfaces';

/**
 * Dashboard Stats Grid Component
 * Grid container for displaying multiple stat cards
 */
@Component({
  selector: 'hms-stats-grid',
  standalone: true,
  imports: [CommonModule, StatCardComponent],
  templateUrl: './stats-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsGridComponent {
  stats = input.required<StatCard[]>();
}

