import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MxLayoutComponent, NavItem } from '@shared/layout';

@Component({
  standalone: true,
  imports: [RouterModule, MxLayoutComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  title = 'Hospital Management System';

  navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'e-icons e-home',
      route: '/dashboard',
    },
    {
      id: 'patients',
      label: 'Patients',
      icon: 'e-icons e-user',
      route: '/patients',
      children: [
        {
          id: 'patient-list',
          label: 'Patient List',
          icon: 'e-icons e-list-unordered',
          route: '/patients/list',
        },
        {
          id: 'patient-registration',
          label: 'Registration',
          icon: 'e-icons e-plus',
          route: '/patients/register',
        },
        {
          id: 'patient-appointments',
          label: 'Appointments',
          icon: 'e-icons e-calendar',
          route: '/patients/appointments',
        },
      ],
    },
    {
      id: 'medical',
      label: 'Medical Records',
      icon: 'e-icons e-folder',
      route: '/medical',
      children: [
        {
          id: 'medical-records',
          label: 'View Records',
          icon: 'e-icons e-file-new',
          route: '/medical/records',
        },
        {
          id: 'prescriptions',
          label: 'Prescriptions',
          icon: 'e-icons e-edit',
          route: '/medical/prescriptions',
        },
      ],
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: 'e-icons e-chart',
      route: '/reports',
      children: [
        {
          id: 'financial-reports',
          label: 'Financial',
          icon: 'e-icons e-money',
          route: '/reports/financial',
        },
        {
          id: 'patient-reports',
          label: 'Patient Statistics',
          icon: 'e-icons e-bar-chart',
          route: '/reports/patients',
        },
        {
          id: 'staff-reports',
          label: 'Staff Performance',
          icon: 'e-icons e-people',
          route: '/reports/staff',
        },
      ],
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'e-icons e-settings',
      route: '/settings',
      children: [
        {
          id: 'general-settings',
          label: 'General',
          icon: 'e-icons e-tools',
          route: '/settings/general',
        },
        {
          id: 'user-management',
          label: 'Users',
          icon: 'e-icons e-people',
          route: '/settings/users',
        },
      ],
    },
  ];

  userInfo = {
    name: 'John Doe',
    avatar: 'data:image/jpeg;base64,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',
  };
}
