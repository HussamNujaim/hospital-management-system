# Visual Guide - Expected Layout

## Desktop View (Width > 768px)

```
┌────────────────────────────────────────────────────────────────────┐
│ ☰ Hospital Management System              John Doe 👤             │ ← Header (White, 55px)
├───────────────┬────────────────────────────────────────────────────┤
│               │                                                    │
│ 🏠 Main       │  ┌──────────────────────────────────────────────┐ │
│   Dashboard   │  │                                              │ │
│               │  │          Main Dashboard Content              │ │
│ ℹ About       │  │                                              │ │
│               │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐        │ │
│ ⚙ Settings    │  │  │ Stat 1  │ │ Stat 2  │ │ Stat 3  │        │ │
│               │  │  └─────────┘ └─────────┘ └─────────┘        │ │
│               │  │                                              │ │
│               │  └──────────────────────────────────────────────┘ │
│               │                                                    │
│               │                                                    │
│   (Dark)      │              (Light Grey Content Area)            │
│  #2f353a      │                   #e4e5e6                         │
│  250px wide   │                                                    │
│               │                                                    │
└───────────────┴────────────────────────────────────────────────────┘
```

## Color Scheme (CoreUI Theme)

### Header (MxTopbarComponent)
- **Background**: #ffffff (White)
- **Shadow**: 0 1px 2px rgba(0, 0, 0, 0.05)
- **Text**: #23282c (Dark grey)
- **Height**: 55px
- **Position**: Fixed top

### Sidebar (MxSidebarComponent)
- **Background**: #2f353a (Dark grey)
- **Text**: #c8ced3 (Light grey)
- **Active Link**: #20a8d8 (Blue)
- **Hover Background**: #23282c (Darker grey)
- **Width**: 250px
- **Position**: Fixed left

### Content Area
- **Background**: #e4e5e6 (Light grey)
- **Padding**: 1.5rem
- **Margin Top**: 55px (header height)
- **Margin Left**: 250px (sidebar width)

### Interactive Elements
- **Links Hover**: Background transitions to #23282c
- **Active Link**: 
  - Background: #20a8d8
  - Border-left: 3px solid #20a8d8
  - Color: #ffffff

## Component Breakdown

### 1. Header Bar
```
┌────────────────────────────────────────────────────────────┐
│ [☰]  Hospital Management System        [👤 John Doe]       │
│  ↑                 ↑                           ↑            │
│  |                 |                           |            │
│ Menu           App Title                  User Info        │
│ Toggle                                                      │
└────────────────────────────────────────────────────────────┘
```

### 2. Sidebar Navigation
```
┌───────────────┐
│               │
│ 🏠 Main       │ ← Icon + Label
│   Dashboard   │
│               │
│ ℹ About       │ ← Regular state (grey text)
│               │
│ ⚙ Settings    │
│               │
│               │
│ Active Item:  │
│ ┌─────────────┴
│ │ 🏠 Main     │ ← Blue background, white text
│ │   Dashboard │    Left border: 3px blue
│ └─────────────┘
└───────────────┘
```

### 3. Content Area Examples

#### Main Dashboard Page
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  Main Dashboard                                          │
│  Welcome to the Hospital Management System               │
│                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │   Total     │  │ Appointments│  │    Staff    │    │
│  │  Patients   │  │             │  │             │    │
│  │    1,234    │  │      56     │  │      89     │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
│                                                          │
│  ┌─────────────┐                                        │
│  │ Departments │                                        │
│  │             │                                        │
│  │      12     │                                        │
│  └─────────────┘                                        │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

#### About Page
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  About                                                   │
│  Hospital Management System - Version 1.0.0              │
│                                                          │
│  Features                                                │
│  ✓ Patient Management                                   │
│  ✓ Appointment Scheduling                               │
│  ✓ Electronic Medical Records (EMR)                     │
│  ✓ Billing & Accounting                                 │
│                                                          │
│  Technology Stack                                        │
│  ✓ Angular 20                                           │
│  ✓ Nx Monorepo                                          │
│  ✓ Syncfusion Components                                │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

#### Settings Page
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  Settings                                                │
│  Manage your application settings and preferences        │
│                                                          │
│  General Settings                                        │
│  ─────────────────────────────────────────────────────  │
│                                                          │
│  Theme                                                   │
│  [Light ▼]                                              │
│                                                          │
│  Language                                                │
│  [English ▼]                                            │
│                                                          │
│  Notification Settings                                   │
│  ─────────────────────────────────────────────────────  │
│                                                          │
│  ☑ Email notifications                                  │
│  ☐ SMS notifications                                    │
│  ☑ Push notifications                                   │
│                                                          │
│  [Save Changes]  [Cancel]                               │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

## Mobile View (Width < 768px)

```
┌─────────────────────────────┐
│ ☰ HMS        John Doe 👤    │ ← Header
├─────────────────────────────┤
│                             │
│  Content fills full width   │
│                             │
│  ┌───────────────────────┐  │
│  │     Statistics        │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │     More Content      │  │
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘

When ☰ clicked:
┌─────────────────────────────┐
│ [Sidebar Overlay]           │
│                             │
│ 🏠 Main Dashboard           │
│                             │
│ ℹ About                     │
│                             │
│ ⚙ Settings                  │
│                             │
│ [Tap outside to close]      │
└─────────────────────────────┘
```

## Interactive States

### Sidebar Item States

#### Default State
```
┌───────────────┐
│ 🏠 Main       │ ← Grey text (#c8ced3)
│   Dashboard   │   Transparent background
└───────────────┘
```

#### Hover State
```
┌───────────────┐
│ 🏠 Main       │ ← White text (#fff)
│   Dashboard   │   Dark background (#23282c)
└───────────────┘    Cursor: pointer
```

#### Active State
```
│
├───────────────┐
│ 🏠 Main       │ ← White text (#fff)
│   Dashboard   │   Blue background (#20a8d8)
└───────────────┘   Blue left border (3px)
```

### Hamburger Menu Toggle

#### Sidebar Open
```
☰  ← Click to close
```

#### Sidebar Closed
```
☰  ← Click to open
```

## Animation/Transitions

1. **Sidebar Toggle**: 0.3s ease transition
2. **Link Hover**: 0.15s background-color transition
3. **Content Margin**: Adjusts smoothly with sidebar

## Typography

- **Header Title**: 1.125rem, font-weight: 600
- **Sidebar Items**: 0.875rem, font-weight: 400
- **Active Item**: 0.875rem, font-weight: 400
- **Page Titles**: 1.75rem, font-weight: 600
- **Body Text**: 1rem, font-weight: 400

## Spacing

- **Header Padding**: 0 1rem
- **Sidebar Item Padding**: 0.75rem 1rem
- **Content Padding**: 1.5rem
- **Card Padding**: 2rem
- **Grid Gap**: 1.5rem

## Icons

Uses Syncfusion e-icons:
- 🏠 `e-icons e-home` - Home/Dashboard
- ℹ `e-icons e-info` - Information
- ⚙ `e-icons e-settings` - Settings
- ☰ `e-icons e-menu` - Hamburger menu

## What You Should See

When you run `npx nx serve hms`:

1. **On Load**: 
   - Application displays with sidebar open
   - Main Dashboard page is shown (default route)
   - Main Dashboard link is highlighted in blue
   - Header shows "Hospital Management System" and "John Doe"

2. **Click "About"**:
   - Navigation to /about
   - About link becomes active (blue)
   - Content area shows About page
   - Main Dashboard link returns to grey

3. **Click Hamburger Menu**:
   - Sidebar closes
   - Content area expands to full width
   - Menu icon remains visible

4. **Click Menu Again**:
   - Sidebar reopens
   - Content area shrinks back

5. **Resize Window**:
   - Below 768px: Sidebar becomes overlay
   - Above 768px: Sidebar is fixed/push

## Browser Compatibility

- Chrome ✓
- Firefox ✓
- Edge ✓
- Safari ✓

## Scrolling Behavior

- **Header**: Fixed, always visible
- **Sidebar**: Scrollable with custom scrollbar
- **Content**: Scrollable independently
- **Overall**: No horizontal scroll

