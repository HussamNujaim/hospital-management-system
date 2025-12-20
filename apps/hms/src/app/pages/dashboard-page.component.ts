import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsGridComponent, StatCard } from '@shared/shared-ui';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, StatsGridComponent],
  template: `
    <!-- Dashboard Stats -->
    <hms-stats-grid [stats]="stats()" />

    <!-- Dashboard Charts & Emergency Hub -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      <!-- Live Patient Flow Chart -->
      <div class="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 class="font-bold text-xl text-slate-800 dark:text-white mb-10">Live Patient Flow</h3>
        <div class="h-64 flex items-end justify-between gap-3 px-2">
          @for (day of weekDays; track day; let i = $index) {
            <div class="flex-1 flex flex-col items-center gap-4 group">
              <div class="w-full flex justify-center gap-1.5 h-48 items-end relative">
                <div
                  class="w-4 bg-indigo-500 rounded-t-lg transition-all duration-700"
                  [style.height.%]="chartData1[i]"
                ></div>
                <div
                  class="w-4 bg-emerald-400 rounded-t-lg transition-all duration-700"
                  [style.height.%]="chartData2[i]"
                ></div>
              </div>
              <span class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{{ day }}</span>
            </div>
          }
        </div>
      </div>

      <!-- Emergency Hub Card -->
      <div class="bg-indigo-600 dark:bg-indigo-900 p-8 rounded-3xl text-white shadow-xl flex flex-col justify-between overflow-hidden relative">
        <div class="relative z-10">
          <h3 class="text-2xl font-black mb-2 leading-tight">Emergency Hub</h3>
          <p class="text-indigo-100 text-sm leading-relaxed opacity-90 italic">Instant response system for high-priority clinical alerts.</p>
          <div class="mt-8 space-y-3">
            <button class="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-between transition-all font-bold text-sm">
              Trauma Alert <i class="fas fa-exclamation-triangle"></i>
            </button>
            <button class="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-between transition-all font-bold text-sm">
              Bed Tracker <i class="fas fa-bed"></i>
            </button>
          </div>
        </div>
        <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent {
  // Dashboard Statistics Data
  stats = signal<StatCard[]>([
    {
      label: 'Live Admissions',
      value: '1,284',
      trend: 12.5,
      icon: 'fas fa-procedures',
      color: 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
    },
    {
      label: 'OR Utilization',
      value: '92%',
      trend: 4.8,
      icon: 'fas fa-hospital-user',
      color: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
    },
    {
      label: 'Staff Efficiency',
      value: '4.2h',
      trend: -2.4,
      icon: 'fas fa-user-nurse',
      color: 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400'
    },
    {
      label: 'Facility Revenue',
      value: '$242k',
      trend: 8.2,
      icon: 'fas fa-wallet',
      color: 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
    }
  ]);

  // Chart Data
  weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  chartData1 = [60, 85, 45, 90, 70, 40, 55];
  chartData2 = [40, 70, 55, 80, 60, 30, 45];
}

