# @shared/layout

A UI-library agnostic layout library implementing the Adapter Pattern for Hospital Management System.

## Overview

This library provides a responsive admin dashboard layout with CoreUI-inspired design (dark sidebar, white header). It uses the Adapter Pattern to wrap Syncfusion components, making the architecture UI-library agnostic.

## Architecture

### Adapter Pattern Implementation

The library follows the Adapter Pattern to ensure UI-library independence:

1. **Generic Interfaces** (`models/nav-item.interface.ts`)
   - Define framework-agnostic data structures
   - `NavItem`: Generic navigation item with id, label, icon, route, and children

2. **Wrapper Components** (UI Adapters)
   - `MxSidebarComponent`: Wraps Syncfusion Sidebar
   - `MxTopbarComponent`: Wraps Syncfusion AppBar
   - `MxLayoutComponent`: Shell component orchestrating the layout

3. **Consumer Application** (apps/hms)
   - Only imports from `@shared/layout`
   - Never directly uses Syncfusion components
   - Passes generic `NavItem[]` to the layout

## Components

### MxLayoutComponent

Main layout shell component that arranges sidebar, header, and content area.

**Selector:** `<mx-layout>`

**Inputs:**
- `navItems: NavItem[]` - Navigation items for the sidebar
- `title: string` - Application title shown in the header
- `userInfo?: { name: string; avatar?: string }` - User information for header

**Usage:**
```html
<mx-layout 
  [navItems]="navItems"
  [title]="'Hospital Management System'"
  [userInfo]="{ name: 'John Doe', avatar: 'url' }"
>
  <router-outlet></router-outlet>
</mx-layout>
```

### MxSidebarComponent

Collapsible sidebar navigation with support for hierarchical menu items.

**Selector:** `<mx-sidebar>`

**Inputs:**
- `items: NavItem[]` - Menu items to display
- `isOpen: boolean` - Sidebar open/closed state

**Outputs:**
- `itemClick: EventEmitter<NavItem>` - Emitted when menu item is clicked

**Features:**
- Dark theme (#2f353a background)
- Active route highlighting
- Support for nested menu items
- Responsive behavior

### MxTopbarComponent

Header/AppBar component with menu toggle and user info.

**Selector:** `<mx-topbar>`

**Inputs:**
- `title: string` - Title to display
- `userInfo?: { name: string; avatar?: string }` - User information

**Outputs:**
- `menuToggle: EventEmitter<void>` - Emitted when hamburger menu is clicked

**Features:**
- White background with subtle shadow
- Content projection for custom actions
- Responsive design

## NavItem Interface

```typescript
export interface NavItem {
  id: string;          // Unique identifier
  label: string;       // Display label
  icon?: string;       // Icon class (e.g., 'e-icons e-home')
  route?: string;      // Angular route path
  children?: NavItem[]; // Nested menu items
}
```

## Styling

### CoreUI Theme
- **Sidebar:** Dark (#2f353a) with light text (#c8ced3)
- **Header:** White (#fff) with shadow
- **Content:** Light grey background (#e4e5e6)
- **Active Link:** Blue accent (#20a8d8)

### Responsive Design
- Fixed sidebar width: 250px (desktop)
- Collapsible on mobile
- Fixed header height: 55px

## Example Implementation

See `apps/hms/src/app/app.ts` for a complete example:

```typescript
export class AppComponent {
  title = 'Hospital Management System';

  navItems: NavItem[] = [
    {
      id: 'main',
      label: 'Main Dashboard',
      icon: 'e-icons e-home',
      route: '/main',
    },
    {
      id: 'about',
      label: 'About',
      icon: 'e-icons e-info',
      route: '/about',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'e-icons e-settings',
      route: '/settings',
    },
  ];

  userInfo = {
    name: 'John Doe',
    avatar: 'https://via.placeholder.com/32',
  };
}
```

## Dependencies

- `@angular/common`
- `@angular/router`
- `@syncfusion/ej2-angular-navigations`

## Running unit tests

Run `nx test layout` to execute the unit tests.

## Future Enhancements

1. Add support for badges/notifications on menu items
2. Implement dark mode toggle
3. Add breadcrumb navigation
4. Support for collapsible sidebar on desktop
5. Multi-level nested menu support (currently supports 2 levels)

