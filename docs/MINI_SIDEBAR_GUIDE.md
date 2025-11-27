# Mini Sidebar (Dock Mode) - Implementation Guide

## Overview

The sidebar now supports **Mini/Dock Mode** where it collapses to a 60px width showing only icons, similar to CoreUI's behavior. This provides maximum screen space while keeping navigation accessible.

## Features Implemented

### 1. Desktop Behavior (> 992px)
- **Default State**: Expanded (250px) with icons + labels
- **Toggle Behavior**: Hamburger menu toggles between expanded and mini mode
- **Mini Mode**: 60px width, icons centered, labels hidden
- **Smooth Transition**: 0.3s ease animation

### 2. Mobile/Tablet Behavior (< 992px)
- **Default State**: Hidden initially
- **Toggle Behavior**: Hamburger menu shows/hides sidebar
- **Always Mini**: When visible, sidebar is always in mini mode (60px)
- **Overlay**: Fixed position, overlays content with shadow

### 3. Visual States

#### Expanded State (Desktop, 250px)
```
┌────────────┐
│    HMS     │ ← Brand with full text
├────────────┤
│ 🏠 Main    │ ← Icon + Label
│ Dashboard  │
│            │
│ ℹ About    │
│            │
│ ⚙ Settings │
└────────────┘
```

#### Mini State (60px)
```
┌───┐
│ H │ ← Brand icon only
├───┤
│ 🏠│ ← Icon centered
│   │
│ ℹ │
│   │
│ ⚙ │
└───┘
```

## Component Architecture

### 1. MxSidebarComponent (Adapter)

**New Inputs:**
```typescript
@Input() isCollapsed = false; // Controls mini/dock mode
```

**Template Logic:**
```html
<div class="sidebar-wrapper" [class.sidebar-collapsed]="isCollapsed">
  <div class="sidebar-brand">
    <span class="brand-text" *ngIf="!isCollapsed">HMS</span>
    <span class="brand-icon" *ngIf="isCollapsed">H</span>
  </div>
  
  <nav>
    <a [title]="isCollapsed ? item.label : ''">
      <i [class]="item.icon"></i>
      <span *ngIf="!isCollapsed">{{ item.label }}</span>
    </a>
  </nav>
</div>
```

**Key CSS:**
```scss
.sidebar-collapsed {
  .nav-link {
    justify-content: center;
    padding: 1rem 0;
  }
  
  .nav-icon {
    margin-right: 0;
    font-size: 1.25rem;
  }
  
  .nav-label {
    display: none;
  }
}
```

### 2. MxLayoutComponent (Orchestrator)

**State Management:**
```typescript
public isSidebarOpen = true;      // Visibility (mobile)
public isSidebarCollapsed = false; // Mini mode (desktop)
public isMobile = false;           // Responsive flag
```

**Responsive Logic:**
```typescript
private setupResponsiveLayout(): void {
  this.mediaQuery = window.matchMedia('(max-width: 992px)');
  
  if (matches) {
    // Mobile: Hidden initially, mini when shown
    this.isSidebarCollapsed = true;
    this.isSidebarOpen = false;
  } else {
    // Desktop: Expanded by default
    this.isSidebarCollapsed = false;
    this.isSidebarOpen = true;
  }
}
```

**Toggle Behavior:**
```typescript
onMenuToggle(): void {
  if (this.isMobile) {
    // Mobile: Toggle visibility
    this.isSidebarOpen = !this.isSidebarOpen;
  } else {
    // Desktop: Toggle mini mode
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
```

**Layout CSS:**
```scss
.sidebar-column {
  width: 250px;
  transition: width 0.3s ease;
}

.sidebar-column.sidebar-mini {
  width: 60px;
}

.sidebar-column.sidebar-hidden {
  width: 0;
  margin-left: -250px;
}
```

## Usage

### From App Component

The app component doesn't need any changes! The responsive behavior is encapsulated in the layout library:

```typescript
// apps/hms/src/app/app.ts
export class AppComponent {
  navItems: NavItem[] = [
    { id: 'main', label: 'Main Dashboard', icon: 'e-icons e-home', route: '/main' },
    { id: 'about', label: 'About', icon: 'e-icons e-info', route: '/about' },
    { id: 'settings', label: 'Settings', icon: 'e-icons e-settings', route: '/settings' },
  ];
}
```

```html
<!-- apps/hms/src/app/app.html -->
<mx-layout [navItems]="navItems" [title]="title" [userInfo]="userInfo">
  <router-outlet></router-outlet>
</mx-layout>
```

**That's it!** The layout automatically handles:
- Desktop: Expanded by default, toggle to mini
- Mobile: Hidden by default, mini when shown

## Responsive Breakpoints

| Screen Width | Behavior | Sidebar Width | Toggle Action |
|--------------|----------|---------------|---------------|
| > 992px (Desktop) | Expanded default | 250px → 60px | Mini mode |
| < 992px (Tablet/Mobile) | Hidden default | 60px (mini) | Show/Hide |

## Visual Examples

### Desktop - Expanded (Default)
```
┌───────────┬──────────────────────────────────┐
│   HMS     │ ☰ Hospital System      John Doe  │
├───────────┼──────────────────────────────────┤
│           │                                  │
│ 🏠 Main   │        Content Area              │
│ Dashboard │                                  │
│           │                                  │
│ 250px     │        Flex: 1                   │
└───────────┴──────────────────────────────────┘
```

### Desktop - Mini Mode (Clicked Hamburger)
```
┌──┬─────────────────────────────────────────┐
│H │ ☰ Hospital System          John Doe     │
├──┼─────────────────────────────────────────┤
│  │                                         │
│🏠│        Content Area (Expanded)          │
│  │                                         │
│ℹ │                                         │
│  │                                         │
│⚙ │                                         │
│  │                                         │
│60│             More Space                  │
│px│                                         │
└──┴─────────────────────────────────────────┘
```

### Mobile - Hidden (Default)
```
┌─────────────────────────────────────────┐
│ ☰ Hospital System          John Doe     │
├─────────────────────────────────────────┤
│                                         │
│        Content Full Width               │
│                                         │
└─────────────────────────────────────────┘
```

### Mobile - Mini Shown (Clicked Hamburger)
```
┌──┬──────────────────────────────────────┐
│H │ Hospital System          John Doe    │
├──┼──────────────────────────────────────┤
│  │                                      │
│🏠│        Content (Behind)              │
│  │                                      │
│ℹ │        Tap outside to close          │
│  │                                      │
│⚙ │                                      │
│  │                                      │
│  │                                      │
│60│                                      │
│px│                                      │
└──┴──────────────────────────────────────┘
   ↑ Fixed overlay with shadow
```

## CSS Transitions

All state changes are smooth with 0.3s ease transitions:

```scss
.sidebar-column {
  transition: width 0.3s ease, margin-left 0.3s ease;
}

.sidebar-wrapper {
  transition: all 0.3s ease;
}

.nav-icon {
  transition: margin 0.3s ease, font-size 0.3s ease;
}
```

## Accessibility Features

1. **Tooltips**: When collapsed, links show tooltips with full label text
   ```html
   <a [title]="isCollapsed ? item.label : ''">
   ```

2. **Icon Sizing**: Icons are larger (1.25rem) in mini mode for better touch targets

3. **Keyboard Navigation**: All links remain keyboard accessible

## Library Agnostic Principle Maintained

✅ **App Layer**: No knowledge of dock sizes or responsive logic
- App just passes `navItems` to `<mx-layout>`
- No media queries in app code
- No direct sidebar manipulation

✅ **Layout Library**: Encapsulates all behavior
- Responsive logic inside `MxLayoutComponent`
- Mini mode handling in `MxSidebarComponent`
- Smooth transitions via CSS

✅ **No Syncfusion Positioning**: Pure CSS flexbox
- No `<ejs-sidebar>` overlay
- Simple width transitions
- Easy to customize

## Customization

### Change Mini Width
```scss
// In mx-layout.component.scss
.sidebar-column.sidebar-mini {
  width: 80px; // Instead of 60px
}
```

### Change Breakpoint
```typescript
// In mx-layout.component.ts
this.mediaQuery = window.matchMedia('(max-width: 1200px)');
```

### Disable Mini Mode on Desktop
```typescript
// In mx-layout.component.ts
onMenuToggle(): void {
  if (this.isMobile) {
    this.isSidebarOpen = !this.isSidebarOpen;
  } else {
    // Hide completely instead of mini mode
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
```

## Testing Checklist

### Desktop (> 992px)
- [ ] Page loads with sidebar expanded (250px)
- [ ] Click hamburger → sidebar collapses to mini (60px)
- [ ] Content area expands smoothly
- [ ] Click hamburger again → sidebar expands back
- [ ] Icons are centered in mini mode
- [ ] Labels are hidden in mini mode
- [ ] Brand shows "H" in mini mode, "HMS" when expanded
- [ ] Hover shows tooltip with full label in mini mode
- [ ] Active route still highlights in mini mode
- [ ] Smooth 0.3s transitions

### Mobile (< 992px)
- [ ] Page loads with sidebar hidden
- [ ] Click hamburger → sidebar appears as mini (60px)
- [ ] Sidebar overlays content (fixed position)
- [ ] Sidebar has shadow
- [ ] Click nav item → sidebar hides automatically
- [ ] Resize to desktop → sidebar becomes expanded
- [ ] Resize to mobile → sidebar hides

### Edge Cases
- [ ] Rapid clicking hamburger doesn't break animation
- [ ] Window resize during animation handles gracefully
- [ ] Long menu labels don't break mini mode
- [ ] Icons without labels still work
- [ ] Nested menu items hidden in mini mode (collapsed state)

## Performance

- **Zero dependencies**: No Angular CDK required
- **Native matchMedia**: Browser-optimized responsive detection
- **CSS transitions**: Hardware-accelerated animations
- **Memory cleanup**: Media query listeners properly removed on destroy

## Future Enhancements

1. **Persistent State**: Save user's mini/expanded preference to localStorage
2. **Hover Expansion**: Mini sidebar expands on hover (like Windows Start Menu)
3. **Animation Options**: Configurable transition speeds
4. **Custom Mini Width**: Input property for custom dock size
5. **Icon-Only Route**: Special mini menu items that only show in mini mode

---

## 🎉 Status: Complete

The mini sidebar (dock mode) is fully implemented with responsive behavior!

**Key Benefits:**
✅ Desktop: Toggle between expanded (250px) and mini (60px)
✅ Mobile: Hidden by default, mini overlay when shown
✅ Smooth transitions and animations
✅ UI-library agnostic (no Syncfusion positioning)
✅ Zero configuration needed in app code
✅ Encapsulated responsive logic

