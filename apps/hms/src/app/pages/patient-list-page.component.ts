import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-list-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300">
      <div class="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-black text-slate-800 dark:text-white">Patient List</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">View and manage all registered patients</p>
        </div>
        <button class="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 active:scale-95 transition-all">
          <i class="fas fa-user-plus mr-2"></i>Add Patient
        </button>
      </div>
      <div class="p-20 text-center flex flex-col items-center">
        <div class="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 border-4 border-white dark:border-slate-700 shadow-xl">
          <i class="fas fa-users text-4xl text-indigo-500 opacity-50"></i>
        </div>
        <h3 class="text-lg font-bold text-slate-800 dark:text-white">Patient Database</h3>
        <p class="text-slate-400 dark:text-slate-500 max-w-sm mx-auto mt-2">
          The patient management system will be displayed here.
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientListPageComponent {}

