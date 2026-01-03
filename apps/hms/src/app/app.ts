import {
  Component,
  OnInit,
  signal,
  computed,
  ChangeDetectionStrategy,
  HostListener,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

// Import UI Kit Components and Interfaces
import {
  LayoutComponent,
  NavItem,
  StatCard,
  TranslationService
} from '@shared/shared-ui';

/**
 * Hospital Management System Dashboard - Refactored with Routing
 *
 * This is the lean consumer app that uses the UI Kit library.
 * All visual components are now reusable and live in libs/shared/ui.
 *
 * This component only handles:
 * - Application state and data
 * - Business logic
 * - Event handling
 * - Navigation via Angular Router
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LayoutComponent],
  templateUrl: "./app.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  // Inject Router
  private router = inject(Router);

  // Inject Translation Service (public for template access)
  translationService = inject(TranslationService);

  // ============================================
  // STATE MANAGEMENT (Data Layer)
  // ============================================

  // UI State
  isSidebarCollapsed = signal(false);
  isDarkMode = signal(false);
  activePage = signal<string>('dashboard');

  // Navigation Data - Computed to react to language changes
  navItems = computed<NavItem[]>(() => {
    const t = this.translationService;
    return [
      { id: 'dashboard', label: t.t('dashboard'), icon: 'fas fa-chart-pie' },
      {
        id: 'patients',
        label: t.t('patients'),
        icon: 'fas fa-users',
        children: [
          { id: 'patients/list', label: t.t('patientList'), icon: 'fas fa-list' },
          { id: 'patients/register', label: t.t('registerPatient'), icon: 'fas fa-user-plus' },
          { id: 'patients/appointments', label: t.t('appointments'), icon: 'fas fa-calendar-check' },
          { id: 'patients/book-appointment', label: 'Book Appointment', icon: 'fas fa-calendar-plus' }
        ]
      },
      {
        id: 'medical',
        label: t.t('medicalRecords'),
        icon: 'fas fa-file-medical',
        children: [
          { id: 'medical/records', label: t.t('records'), icon: 'fas fa-folder-open' },
          { id: 'medical/prescriptions', label: t.t('prescriptions'), icon: 'fas fa-pills' }
        ]
      },
      {
        id: 'reports',
        label: t.t('reports'),
        icon: 'fas fa-chart-bar',
        children: [
          { id: 'reports/financial', label: t.t('financial'), icon: 'fas fa-dollar-sign' },
          { id: 'reports/patients', label: t.t('patientStats'), icon: 'fas fa-users' },
          { id: 'reports/staff', label: t.t('staffReports'), icon: 'fas fa-user-md' }
        ]
      },
      {
        id: 'settings',
        label: t.t('settings'),
        icon: 'fas fa-cog',
        children: [
          { id: 'settings/general', label: t.t('general'), icon: 'fas fa-sliders-h' },
          { id: 'settings/users', label: t.t('userManagement'), icon: 'fas fa-users-cog' }
        ]
      },
    ];
  });

  // Dashboard Statistics Data - Computed to react to language changes
  stats = computed<StatCard[]>(() => {
    const t = this.translationService;
    return [
      {
        label: t.t('liveAdmissions'),
        value: '1,284',
        trend: 12.5,
        icon: 'fas fa-procedures',
        color: 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
      },
      {
        label: t.t('orUtilization'),
        value: '92%',
        trend: 4.8,
        icon: 'fas fa-hospital-user',
        color: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
      },
      {
        label: t.t('staffEfficiency'),
        value: '4.2h',
        trend: -2.4,
        icon: 'fas fa-user-nurse',
        color: 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400'
      },
      {
        label: t.t('facilityRevenue'),
        value: '$242k',
        trend: 8.2,
        icon: 'fas fa-wallet',
        color: 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
      }
    ];
  });

  // ============================================
  // COMPUTED PROPERTIES
  // ============================================

  currentPageTitle = computed(() => {
    const topLevelItem = this.navItems().find(i => i.id === this.activePage());
    if (topLevelItem) return topLevelItem.label;

    // Check if it's a sub-item
    for (const item of this.navItems()) {
      if (item.children) {
        const subItem = item.children.find((s: { id: string }) => s.id === this.activePage());
        if (subItem) return `${item.label} / ${subItem.label}`;
      }
    }
    return 'Dashboard';
  });

  // ============================================
  // LIFECYCLE HOOKS
  // ============================================

  ngOnInit() {
    this.loadFontAwesome();
    this.checkInitialScreenSize();

    // Sync activePage with current route
    this.syncActivePageWithRoute();

    // Listen to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.syncActivePageWithRoute();
      });
  }

  // ============================================
  // EVENT HANDLERS
  // ============================================

  toggleSidebar() {
    this.isSidebarCollapsed.set(!this.isSidebarCollapsed());
  }

  onPageChange(pageId: string) {
    // Navigate using Angular Router
    // Split the path into segments for proper routing (e.g., 'patients/list' -> ['patients', 'list'])
    const pathSegments = pageId.split('/');
    this.router.navigate(pathSegments);
  }

  onThemeToggle(isDark: boolean) {
    this.isDarkMode.set(isDark);
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth < 1024) {
      this.isSidebarCollapsed.set(true);
    }
  }

  // ============================================
  // PRIVATE HELPERS
  // ============================================

  private syncActivePageWithRoute() {
    // Get current URL without leading slash
    let currentUrl = this.router.url.substring(1) || 'dashboard';
    // Remove any query params or fragments
    currentUrl = currentUrl.split('?')[0].split('#')[0];
    this.activePage.set(currentUrl);
  }

  private checkInitialScreenSize() {
    if (window.innerWidth < 1024) {
      this.isSidebarCollapsed.set(true);
    }
  }

  private loadFontAwesome() {
    if (!document.getElementById('fa-icons')) {
      const link = document.createElement('link');
      link.id = 'fa-icons';
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      document.head.appendChild(link);
    }
  }
}

