# Atomic Design System Wireframe Development Prompt

## Project Overview
Please create detailed wireframes following the Atomic Design System methodology, progressing from atoms to pages. Incorporate responsive design principles, micro-interactions, and motion design patterns throughout all component levels.

## Design System Hierarchy

### 1. Atoms (Basic Building Blocks)
Define and document:
- Typography scale (heading and body text styles)
- Color palette (primary, secondary, accent, neutral)
- Spacing units and grid system
- Basic form elements:
  - Input fields with focus/hover states
  - Buttons with loading/success/error states
  - Checkboxes and radio buttons
  - Toggle switches
- Icons and basic shapes
- Elevation/shadow system

Include for each atom:
- Default state
- Hover state with timing function (e.g., ease-in-out 0.2s)
- Focus state with accessible outline
- Active/pressed state
- Disabled state
- Error state where applicable

### 2. Molecules (Component Groups)
Detail the following:
- Form groups with validation feedback
- Search bars with suggestions
- Navigation items
- Card headers
- Media objects
- Input groups with labels and helper text

Specify for each molecule:
- Component composition using atoms
- Spacing relationships
- Interactive states
- Micro-interactions:
  - Loading spinners (duration: 0.8s, easing: cubic-bezier)
  - Validation feedback animations
  - Hover transitions
  - Focus behaviors

### 3. Organisms (Complex Components)
Document the following:
- Navigation bars
  - Desktop: horizontal layout
  - Mobile: hamburger menu with smooth slide-out (0.3s ease)
- Hero sections
- Card layouts
- Form sections
- Content grids
- Feature sections

Include for each organism:
- Responsive breakpoints (mobile: 320px, tablet: 768px, desktop: 1024px+)
- Grid system implementation
- Component hierarchy
- State management
- Loading states and skeleton screens
- Error handling patterns

### 4. Templates (Page Layouts)
Define:
- Grid systems and containers
  - Maximum width constraints
  - Margin and padding rules
  - Column behavior across breakpoints
- Header layouts
- Main content areas
- Sidebar configurations
- Footer structures

Specify:
- Responsive behavior
  - Mobile-first approach
  - Breakpoint-specific layouts
  - Content reflow patterns
- Loading sequences
- Page transition animations
- Scroll-based interactions

### 5. Pages (Complete Interfaces)
Detail:
- Specific page types (home, product, contact, etc.)
- Content population patterns
- State variations:
  - Loading
  - Empty states
  - Error states
  - Success states
  - Different user roles/permissions

## Interaction Specifications

### Micro-interactions
Define for all interactive elements:
- Timing: 
  - Quick feedback: 0.2s
  - Complex animations: 0.3-0.8s
  - Page transitions: 0.4s
- Easing functions:
  - Buttons: ease-out
  - Modals: cubic-bezier(0.4, 0, 0.2, 1)
  - Page transitions: ease-in-out
- Transform properties:
  - Scale: 1.02 for hover states
  - Translate: -2px for active states
  - Rotate: where applicable for icons

### Animation Patterns
Specify:
- Loading states:
  - Skeleton screens with wave animation
  - Progressive loading patterns
  - Smooth fade-ins (opacity: 0 to 1, 0.3s)
- Transitions:
  - Page navigation with slide effects
  - Modal displays with fade and scale
  - Menu expansions with height animations
- Feedback:
  - Success animations (checkmarks, confirmations)
  - Error shake animations
  - Progress indicators

## Responsive Design Requirements

### Breakpoint System
Define specific behaviors at:
- Mobile (320px - 767px)
- Tablet (768px - 1023px)
- Desktop (1024px - 1439px)
- Large Desktop (1440px+)

### Layout Adaptations
Specify:
- Grid system changes
- Component reflow patterns
- Navigation transformations
- Image scaling and art direction
- Typography fluid scaling
- Spacing adjustments

## Design Principles

### Visual Hierarchy
- Clear content structure
- Consistent heading levels
- Visual weight distribution
- Whitespace utilization
- Emphasis patterns

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation patterns
- Screen reader considerations
- Focus management
- Color contrast requirements

### Performance
- Loading strategy
- Asset optimization
- Animation performance
- Lazy loading patterns
- Progressive enhancement

## Documentation Requirements
Include:
- Component states and variations
- Interaction specifications
- Animation timings and curves
- Responsive behavior
- Accessibility requirements
- Implementation notes
- Usage guidelines
- Code examples where applicable

## Deliverables
Provide:
- Wireframe documentation
- Interactive prototype
- Component library
- Animation specifications
- Responsive guidelines
- Implementation notes

## Grid System & Layout Specifications

### CSS Grid Framework
Define grid systems using:
- Display Grid Properties
  ```css
  .grid-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: var(--grid-gap);
    padding: var(--container-padding);
  }
  ```

#### Base Grid Variables
- Primary grid: 12 columns
- Secondary grid: 6 columns (mobile)
- Gutters: 
  - Desktop: 24px
  - Tablet: 16px
  - Mobile: 12px
- Margins:
  - Desktop: 64px
  - Tablet: 32px
  - Mobile: 16px

### Container Specifications
Define maximum widths:
- Full width: 100%
- Wide container: 1440px
- Standard container: 1200px
- Narrow container: 960px
- Content container: 720px

### Layout Templates

#### Web Application Layouts
1. Dashboard Layout
```css
.dashboard-grid {
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: minmax(250px, 1fr) 4fr;
  grid-template-rows: auto 1fr auto;
}
```
- Fixed header (60-80px height)
- Collapsible sidebar (250-300px width)
- Scrollable main content
- Sticky footer

2. Admin Panel Layout
```css
.admin-grid {
  grid-template-areas:
    "nav header header"
    "nav main aside"
    "nav footer footer";
  grid-template-columns: auto 1fr auto;
  min-height: 100vh;
}
```
- Persistent navigation
- Contextual sidebars
- Modular content areas

3. Application Shell
```css
.app-shell {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: minmax(100px, auto);
  gap: 24px;
}
```

#### Website Layouts

1. Marketing Homepage
```css
.marketing-grid {
  grid-template-columns: 
    [full-start] minmax(var(--grid-margin), 1fr)
    [main-start] minmax(0, var(--content-width))
    [main-end] minmax(var(--grid-margin), 1fr)
    [full-end];
}
```
- Hero section: full-width
- Content sections: contained
- Feature grid: alternating layouts

2. Content Page
```css
.content-grid {
  grid-template-columns: 
    [content-start] minmax(0, 720px)
    [content-end sidebar-start] minmax(300px, 1fr)
    [sidebar-end];
  gap: 48px;
}
```
- Main content: 65-75% width
- Sidebar: 25-35% width
- Responsive breakpoints

3. Product Grid
```css
.product-grid {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  padding: var(--container-padding);
}
```

### Responsive Grid Patterns

#### Desktop-First Breakpoints
```css
/* Large Desktop (1440px+) */
.grid {
  grid-template-columns: repeat(12, 1fr);
}

/* Desktop (1024px - 1439px) */
@media (max-width: 1439px) {
  .grid {
    grid-template-columns: repeat(12, 1fr);
    gap: 24px;
  }
}

/* Tablet (768px - 1023px) */
@media (max-width: 1023px) {
  .grid {
    grid-template-columns: repeat(8, 1fr);
    gap: 16px;
  }
}

/* Mobile (320px - 767px) */
@media (max-width: 767px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }
}
```

#### Component Grid Placement
Define placement rules for:
1. Navigation Components
```css
.main-nav {
  grid-column: 1 / -1; /* Full width */
}
```

2. Content Blocks
```css
.content-block {
  grid-column: 2 / span 10; /* Centered content */
}
```

3. Feature Sections
```css
.feature-section {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

### Layout Best Practices

#### Whitespace Management
- Consistent spacing scale:
  ```css
  :root {
    --space-xs: 4px;
    --space-sm: 8px;
    --space-md: 16px;
    --space-lg: 24px;
    --space-xl: 32px;
    --space-2xl: 48px;
    --space-3xl: 64px;
  }
  ```

#### Content Hierarchy
1. Z-index Scale
```css
:root {
  --z-negative: -1;
  --z-normal: 0;
  --z-tooltip: 10;
  --z-fixed: 100;
  --z-modal: 1000;
}
```

2. Layout Zones
- Header zone (top)
- Navigation zone (left/top)
- Content zone (center)
- Tool zone (right)
- Footer zone (bottom)

### Performance Considerations
1. CSS Grid Performance
- Use `will-change` sparingly
- Implement `contain` property
- Layer promotion for animations

2. Layout Shifting Prevention
```css
.grid-item {
  contain: layout size;
  aspect-ratio: 16 / 9;
}
```

### Accessibility Guidelines
1. Grid Navigation
- Logical tab order
- Skip navigation links
- Landmark regions

2. Responsive Considerations
- Maintain readability
- Touch targets (minimum 44x44px)
- Viewport meta tags

[Rest of the previous sections remain the same...]
