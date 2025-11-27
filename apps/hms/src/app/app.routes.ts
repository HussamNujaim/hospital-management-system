import { Route } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page.component';
import { PatientListPageComponent } from './pages/patient-list-page.component';
import { PatientRegistrationPageComponent } from './pages/patient-registration-page.component';
import { PatientAppointmentsPageComponent } from './pages/patient-appointments-page.component';
import { MedicalRecordsPageComponent } from './pages/medical-records-page.component';
import { PrescriptionsPageComponent } from './pages/prescriptions-page.component';
import { FinancialReportsPageComponent } from './pages/financial-reports-page.component';
import { PatientStatisticsPageComponent } from './pages/patient-statistics-page.component';
import { StaffReportsPageComponent } from './pages/staff-reports-page.component';
import { GeneralSettingsPageComponent } from './pages/general-settings-page.component';
import { UserManagementPageComponent } from './pages/user-management-page.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardPageComponent },

  // Patients routes
  { path: 'patients/list', component: PatientListPageComponent },
  { path: 'patients/register', component: PatientRegistrationPageComponent },
  { path: 'patients/appointments', component: PatientAppointmentsPageComponent },

  // Medical Records routes
  { path: 'medical/records', component: MedicalRecordsPageComponent },
  { path: 'medical/prescriptions', component: PrescriptionsPageComponent },

  // Reports routes
  { path: 'reports/financial', component: FinancialReportsPageComponent },
  { path: 'reports/patients', component: PatientStatisticsPageComponent },
  { path: 'reports/staff', component: StaffReportsPageComponent },

  // Settings routes
  { path: 'settings/general', component: GeneralSettingsPageComponent },
  { path: 'settings/users', component: UserManagementPageComponent },
];
