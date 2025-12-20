# Hospital Management System - Shared UI Library

> A modern, reusable Angular component library for healthcare management applications built with Nx Monorepo architecture.

## 🎯 Overview

This library provides a complete set of UI components for building hospital management dashboards and applications. All components follow modern Angular best practices with OnPush change detection, Signal-based state management, and full TypeScript type safety.

## 📦 What's Inside

### Components

- **LayoutComponent** - Main application shell with sidebar, header, and content projection
- **SidebarComponent** - Collapsible navigation with accordion and flyout modes
- **ThemeToggleComponent** - Dark/light mode toggle
- **StatCardComponent** - Metric display cards with trend indicators
- **StatsGridComponent** - Responsive grid for statistics

### Interfaces

- **NavItem** & **NavSubItem** - Navigation structure definitions
- **StatCard** - Statistics data structure

### Styles

- **shared-styles.scss** - Common utilities, animations, and scrollbar styles

## 🚀 Installation

This library is part of the monorepo. To use it in your app:

```typescript
import {
  LayoutComponent,
  SidebarComponent,
  ThemeToggleComponent,
  StatCardComponent,
  StatsGridComponent,
  NavItem,
  NavSubItem,
  StatCard
} from '@hospital-management-system/shared/ui';
```

## 📝 Quick Example

```typescript
import { Component, signal } from '@angular/core';
import { LayoutComponent, StatsGridComponent, NavItem, StatCard } 
  from '@hospital-management-system/shared/ui';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LayoutComponent, StatsGridComponent],
  template: `
    <hms-layout
      [navItems]="navItems()"
      [isSidebarCollapsed]="collapsed()"
      [activePageId]="page()"
      [pageTitle]="'Dashboard'"
      [isDarkMode]="dark()"
      (sidebarToggle)="collapsed.set(!collapsed())"
      (pageChange)="page.set($event)"
      (themeToggle)="dark.set($event)"
    >
      <hms-stats-grid [stats]="stats()" />
    </hms-layout>
  `
})
export class DashboardComponent {
  collapsed = signal(false);
  dark = signal(false);
  page = signal('dashboard');
  
  navItems = signal<NavItem[]>([
    { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-home' }
  ]);
  
  stats = signal<StatCard[]>([
    {
      label: 'Patients',
      value: '1,284',
      trend: 12.5,
      icon: 'fas fa-users',
      color: 'bg-indigo-100 text-indigo-600'
    }
  ]);
}
```

## 🎨 Styling

### Import Shared Styles

Add to your app's `styles.scss`:

```scss
@import '../../../libs/shared/ui/src/lib/styles/shared-styles.scss';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Tailwind Configuration

Ensure the library is included in your Tailwind config:

```javascript
const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  // ... rest of config
};
```

## 🔧 Features

- ✅ **Modern Angular** - Standalone components, Signals, OnPush
- ✅ **Type Safe** - Full TypeScript support
- ✅ **Dark Mode** - Built-in theme switching
- ✅ **Responsive** - Mobile-first design
- ✅ **Accessible** - ARIA labels and semantic HTML
- ✅ **Performant** - OnPush change detection
- ✅ **Reusable** - Works across multiple apps
- ✅ **Well Documented** - Comprehensive API docs

## 📚 Documentation

- **[Quick Start Guide](../../../docs/UI_KIT_QUICK_START.md)** - Get started in 3 steps
- **[API Reference](../../../docs/UI_KIT_API_REFERENCE.md)** - Detailed component APIs
- **[Refactoring Guide](../../../docs/MONOREPO_REFACTORING_GUIDE.md)** - Architecture details

## 🧪 Testing

Run tests:
```bash
nx test shared-ui
```

## 🏗️ Building

Build the library:
```bash
nx build shared-ui
```

## 📋 Component APIs

### LayoutComponent

```typescript
<hms-layout
  [navItems]="navItems()"           // Navigation items
  [isSidebarCollapsed]="false"      // Sidebar state
  [activePageId]="'dashboard'"      // Active page
  [pageTitle]="'Dashboard'"         // Page title
  [isDarkMode]="false"              // Theme
  (sidebarToggle)="onToggle()"      // Toggle event
  (pageChange)="onPage($event)"     // Navigation event
  (themeToggle)="onTheme($event)"   // Theme event
>
  <!-- Content projected here -->
</hms-layout>
```

### SidebarComponent

```typescript
<hms-sidebar
  [navItems]="navItems()"           // Navigation items
  [isCollapsed]="false"             // Collapse state
  [activePageId]="'dashboard'"      // Active page
  (pageChange)="onPage($event)"     // Navigation event
/>
```

### ThemeToggleComponent

```typescript
<hms-theme-toggle
  [isDarkMode]="false"              // Current theme
  (toggle)="onToggle($event)"       // Toggle event
/>
```

### StatCardComponent

```typescript
<hms-stat-card [stat]="{
  label: 'Patients',
  value: '1,284',
  trend: 12.5,
  icon: 'fas fa-users',
  color: 'bg-indigo-100 text-indigo-600'
}" />
```

### StatsGridComponent

```typescript
<hms-stats-grid [stats]="statsArray()" />
```

## 🎨 Design Tokens

### Colors
- Primary: Indigo (600-900)
- Success: Emerald (400-600)
- Warning: Amber (400-600)
- Danger: Rose (400-600)

### Spacing
- Base unit: 4px
- Container padding: 8px (mobile) / 32px (desktop)

### Typography
- Font: System font stack
- Sizes: xs (10px) → 3xl (30px)

## 🤝 Contributing

### Adding New Components

1. Create component in `src/lib/components/`
2. Export in `src/lib/components/index.ts`
3. Update main `src/index.ts`
4. Add documentation to API reference
5. Add tests

### Code Style

- Use `ChangeDetectionStrategy.OnPush`
- Prefer Angular Signals over RxJS for state
- Use input/output functions for component APIs
- Follow Atomic Design principles
- Add JSDoc comments to interfaces

## 📦 Exports

```typescript
// Components
export { LayoutComponent } from './lib/components/layout/layout.component';
export { SidebarComponent } from './lib/components/sidebar/sidebar.component';
export { ThemeToggleComponent } from './lib/components/theme-toggle/theme-toggle.component';
export { StatCardComponent } from './lib/components/stat-card/stat-card.component';
export { StatsGridComponent } from './lib/components/stats-grid/stats-grid.component';

// Interfaces
export { NavItem, NavSubItem } from './lib/interfaces/nav-item.interface';
export { StatCard } from './lib/interfaces/stat-card.interface';
```

## 🐛 Known Issues

None at this time.

## 📄 License

Part of the Hospital Management System project.

## 👥 Maintainers

Hospital Management System Team

## 🔗 Related

- [Main Project README](../../../README.md)
- [EMR App](../../../apps/emr/)
- [HMS App](../../../apps/hms/)

---

**Version**: 1.0.0  
**Last Updated**: December 20, 2025  
**Status**: ✅ Production Ready

