# Architecture Diagram

## Adapter Pattern Implementation

```
┌─────────────────────────────────────────────────────────────────┐
│                         Application Layer                        │
│                      (apps/hms/src/app/)                        │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ AppComponent (app.ts)                                     │  │
│  │                                                            │  │
│  │  - title: string                                          │  │
│  │  - navItems: NavItem[]  ← Generic Interface               │  │
│  │  - userInfo: { name, avatar }                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            │                                     │
│                            │ Uses                                │
│                            ▼                                     │
└─────────────────────────────────────────────────────────────────┘
                             │
                             │
┌─────────────────────────────────────────────────────────────────┐
│                      Adapter Layer (Wrappers)                    │
│                  (libs/shared/layout/src/lib/)                  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ MxLayoutComponent (Shell)                                 │  │
│  │                                                            │  │
│  │  @Input() navItems: NavItem[]                            │  │
│  │  @Input() title: string                                   │  │
│  │  @Input() userInfo                                        │  │
│  │                                                            │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐ │  │
│  │  │ MxTopbar     │  │ MxSidebar    │  │ router-outlet │ │  │
│  │  │ Component    │  │ Component    │  │               │ │  │
│  │  │              │  │              │  │               │ │  │
│  │  │ Wraps:       │  │ Wraps:       │  │ Content Area  │ │  │
│  │  │ Syncfusion   │  │ Syncfusion   │  │               │ │  │
│  │  │ AppBar       │  │ Sidebar      │  │               │ │  │
│  │  └──────────────┘  └──────────────┘  └───────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Generic Interfaces (models/)                              │  │
│  │                                                            │  │
│  │  export interface NavItem {                               │  │
│  │    id: string;                                            │  │
│  │    label: string;                                         │  │
│  │    icon?: string;                                         │  │
│  │    route?: string;                                        │  │
│  │    children?: NavItem[];                                  │  │
│  │  }                                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            │                                     │
│                            │ Internally Maps To                  │
│                            ▼                                     │
└─────────────────────────────────────────────────────────────────┘
                             │
                             │
┌─────────────────────────────────────────────────────────────────┐
│                    UI Library Layer (Hidden)                     │
│                     (@syncfusion/ej2-angular)                   │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐   │
│  │ <ejs-appbar> │  │ <ejs-sidebar>│  │ Other Syncfusion   │   │
│  │              │  │              │  │ Components         │   │
│  └──────────────┘  └──────────────┘  └────────────────────┘   │
│                                                                  │
│  Note: These are NEVER imported directly in the app             │
│        Only accessed through wrapper components                 │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
User Interaction
      │
      ▼
┌─────────────────┐
│   AppComponent  │
│   (Defines      │
│   navItems[])   │
└────────┬────────┘
         │
         │ [navItems]="navItems"
         │
         ▼
┌─────────────────┐
│  MxLayout       │
│  Component      │
└────────┬────────┘
         │
         ├──────────────────┬─────────────────┐
         │                  │                 │
         ▼                  ▼                 ▼
┌────────────────┐  ┌───────────────┐  ┌──────────────┐
│  MxTopbar      │  │  MxSidebar    │  │ router-outlet│
│  Component     │  │  Component    │  │              │
│                │  │               │  │              │
│  Renders:      │  │  Maps:        │  │  Renders:    │
│  - Title       │  │  NavItem[] to │  │  - Current   │
│  - User Info   │  │  Syncfusion   │  │    Route     │
│  - Menu Toggle │  │  Sidebar Data │  │    Content   │
└────────────────┘  └───────────────┘  └──────────────┘
         │                  │
         │                  │ (itemClick)
         │                  │
         └──────────┬───────┘
                    │
                    ▼
              Angular Router
                    │
                    ▼
          ┌─────────────────┐
          │  Route Changed  │
          │  (e.g., /main,  │
          │   /about)       │
          └─────────────────┘
```

## Component Communication

```
┌──────────────────────────────────────────────────────────┐
│                    MxLayoutComponent                      │
│                                                           │
│  Properties:                                             │
│  • isSidebarOpen: boolean                                │
│                                                           │
│  ┌──────────────────┐           ┌───────────────────┐  │
│  │ MxTopbarComponent│           │ MxSidebarComponent│  │
│  │                  │           │                   │  │
│  │ @Output()        │──────────▶│ @Input()          │  │
│  │ menuToggle       │  Toggles  │ isOpen            │  │
│  │                  │           │                   │  │
│  │ @Input()         │           │ @Input()          │  │
│  │ • title          │           │ • items           │  │
│  │ • userInfo       │           │                   │  │
│  │                  │           │ @Output()         │  │
│  │                  │◀──────────│ itemClick         │  │
│  │                  │  Emits    │                   │  │
│  └──────────────────┘  Click    └───────────────────┘  │
│                        Event                            │
└──────────────────────────────────────────────────────────┘
```

## File Organization

```
hospital-management-system/
│
├── apps/
│   └── hms/
│       └── src/
│           ├── app/
│           │   ├── app.ts              ← Uses @shared/layout
│           │   ├── app.html            ← <mx-layout>
│           │   ├── app.routes.ts       ← Route configuration
│           │   └── pages/              ← Feature pages
│           │       ├── main-page.component.ts
│           │       ├── about-page.component.ts
│           │       └── settings-page.component.ts
│           └── styles.scss             ← Global styles + Syncfusion themes
│
└── libs/
    └── shared/
        └── layout/
            └── src/
                ├── index.ts            ← Public API exports
                └── lib/
                    ├── models/
                    │   └── nav-item.interface.ts  ← Generic interface
                    └── mx-layout/
                        ├── mx-layout.component.*   ← Shell
                        ├── mx-sidebar/
                        │   └── mx-sidebar.component.*  ← Sidebar adapter
                        └── mx-topbar/
                            └── mx-topbar.component.*   ← Header adapter
```

## Benefits of This Architecture

### 1. UI Library Independence
```
┌──────────────────────┐
│   Your App Logic     │  ← No dependency on Syncfusion
│   (Business Rules)   │
└──────────┬───────────┘
           │
           │ Uses only @shared/layout
           │
           ▼
┌──────────────────────┐
│  Adapter Components  │  ← Abstract Syncfusion details
│  (Wrappers)          │
└──────────┬───────────┘
           │
           │ Can be swapped with different implementation
           │
           ▼
┌──────────────────────┐
│  Syncfusion Library  │  ← Hidden implementation detail
│  (Can be replaced)   │
└──────────────────────┘
```

### 2. Easy to Replace UI Library
To switch from Syncfusion to another library (e.g., PrimeNG, Material):
1. Update only the wrapper components
2. Keep the generic interfaces unchanged
3. App code remains untouched

### 3. Consistent API Across Apps
All apps in the monorepo use the same `NavItem` interface:
```
emr app ──┐
          ├──▶ @shared/layout ──▶ NavItem interface
hms app ──┘
```

## Styling Architecture

```
┌─────────────────────────────────────────────────────────┐
│ Global Styles (apps/hms/src/styles.scss)                │
│ • Syncfusion theme imports                              │
│ • Tailwind directives                                   │
│ • Global resets                                         │
│ • Scrollbar styling                                     │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│ Component Styles (Scoped)                               │
│                                                          │
│ mx-sidebar.component.scss                               │
│ • Dark theme (#2f353a)                                  │
│ • Navigation item styles                                │
│ • Active state (#20a8d8)                                │
│                                                          │
│ mx-topbar.component.scss                                │
│ • White header (#fff)                                   │
│ • Shadow effect                                         │
│ • User info styles                                      │
│                                                          │
│ mx-layout.component.scss                                │
│ • Grid layout                                           │
│ • Content area (#e4e5e6)                                │
│ • Responsive margins                                    │
└─────────────────────────────────────────────────────────┘
```

## Routing Flow

```
URL Change: /main
      │
      ▼
┌─────────────────┐
│ Angular Router  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Route Matches   │
│ { path: 'main', │
│   component:    │
│   MainPage }    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ <router-outlet> │ ← Inside MxLayoutComponent
│ Renders:        │
│ MainPageComponent│
└─────────────────┘
         │
         ▼
┌─────────────────┐
│ MxSidebar       │
│ Highlights      │
│ Active Route    │
│ (routerLinkActive)│
└─────────────────┘
```

