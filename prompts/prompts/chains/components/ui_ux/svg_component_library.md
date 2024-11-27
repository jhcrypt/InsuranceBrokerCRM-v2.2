# SVG Component Library

## Atomic Design Components

### Atoms

```svg
<!-- Button -->
<svg width="120" height="40" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .button { fill: #E5E7EB; }
      .button:hover { fill: #D1D5DB; }
      .button:active { fill: #9CA3AF; }
      .button:disabled { fill: #F3F4F6; }
    </style>
  </defs>
  <rect class="button" x="0" y="0" width="120" height="40" rx="4" role="button" aria-label="Button"/>
  <text x="60" y="25" text-anchor="middle" dominant-baseline="middle" font-family="Arial">Button</text>
</svg>

<!-- Input Field -->
<svg width="300" height="70" xmlns="http://www.w3.org/2000/svg">
  <text x="0" y="20" font-family="Arial" font-size="14" role="label">Label</text>
  <rect x="0" y="30" width="300" height="40" rx="4" fill="white" stroke="#E5E7EB" role="textbox"/>
  <text x="12" y="55" font-family="Arial" font-size="14" fill="#6B7280">Placeholder</text>
</svg>

<!-- Checkbox -->
<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="24" height="24" rx="4" fill="white" stroke="#E5E7EB" role="checkbox"/>
  <path d="M5 12l5 5 9-9" stroke="#4B5563" fill="none" stroke-width="2" class="check"/>
</svg>
```

### Molecules

```svg
<!-- Form Field Group -->
<svg width="300" height="120" xmlns="http://www.w3.org/2000/svg">
  <text x="0" y="20" font-family="Arial" font-size="14" role="group">Form Group</text>
  <rect x="0" y="30" width="300" height="40" rx="4" fill="white" stroke="#E5E7EB" role="textbox"/>
  <text x="12" y="55" font-family="Arial" font-size="14" fill="#6B7280">Input field</text>
  <text x="0" y="85" font-family="Arial" font-size="12" fill="#EF4444" role="alert">Validation message</text>
</svg>

<!-- Search Bar -->
<svg width="400" height="50" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="400" height="50" rx="25" fill="white" stroke="#E5E7EB" role="search"/>
  <circle cx="20" cy="25" r="8" stroke="#6B7280" fill="none" stroke-width="2"/>
  <line x1="25" y1="30" x2="32" y2="37" stroke="#6B7280" stroke-width="2"/>
  <text x="45" y="30" font-family="Arial" font-size="14" fill="#6B7280">Search...</text>
</svg>
```

### Organisms

```svg
<!-- Navigation Bar -->
<svg width="1200" height="64" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="64" fill="#FFFFFF" role="navigation"/>
  <rect x="20" y="16" width="120" height="32" rx="4" fill="#E5E7EB"/>
  <g transform="translate(200,0)">
    <rect x="0" y="24" width="80" height="16" rx="2" fill="#4B5563"/>
    <rect x="100" y="24" width="80" height="16" rx="2" fill="#4B5563"/>
    <rect x="200" y="24" width="80" height="16" rx="2" fill="#4B5563"/>
  </g>
  <circle cx="1140" cy="32" r="16" fill="#E5E7EB"/>
</svg>

<!-- Card -->
<svg width="320" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="400" rx="8" fill="white" stroke="#E5E7EB" role="article"/>
  <rect x="0" y="0" width="320" height="200" rx="8 8 0 0" fill="#F3F4F6"/>
  <text x="16" y="240" font-family="Arial" font-size="20" fill="#111827">Card Title</text>
  <text x="16" y="270" font-family="Arial" font-size="14" fill="#6B7280">Card description text goes here...</text>
  <rect x="16" y="340" width="120" height="40" rx="4" fill="#E5E7EB"/>
</svg>
```

### Templates

```svg
<!-- Dashboard Layout -->
<svg width="1440" height="900" xmlns="http://www.w3.org/2000/svg">
  <!-- Header -->
  <rect width="1440" height="64" fill="#FFFFFF" stroke="#E5E7EB"/>
  
  <!-- Sidebar -->
  <rect x="0" y="64" width="256" height="836" fill="#F9FAFB"/>
  
  <!-- Main Content -->
  <rect x="256" y="64" width="1184" height="836" fill="#FFFFFF"/>
  
  <!-- Content Grid -->
  <g transform="translate(296,104)">
    <rect width="360" height="240" rx="8" fill="#F3F4F6"/>
    <rect x="380" width="360" height="240" rx="8" fill="#F3F4F6"/>
    <rect x="760" width="360" height="240" rx="8" fill="#F3F4F6"/>
  </g>
</svg>
```

## Usage Guidelines

### Component Properties

Each component should maintain these properties:

1. Accessibility
- ARIA roles and labels
- Keyboard navigation support
- High contrast states

2. Responsiveness
- Flexible viewBox
- Percentage-based scaling
- Breakpoint adaptations

3. States
- Default
- Hover
- Active
- Disabled
- Focus
- Error

### Integration Notes

1. SVG Implementation
```typescript
interface SVGComponentProps {
  width?: number;
  height?: number;
  className?: string;
  ariaLabel?: string;
  state?: 'default' | 'hover' | 'active' | 'disabled';
}
```

2. State Management
```typescript
const [componentState, setComponentState] = useState<ComponentState>('default');
```

3. Event Handling
```typescript
const handleInteraction = (event: InteractionEvent) => {
  setComponentState(getNewState(event.type));
};
```

## Validation Rules

1. Component Requirements
- Valid SVG syntax
- Proper viewBox definition
- Responsive scaling
- ARIA attributes
- State variations

2. Documentation Requirements
- Usage examples
- Props documentation
- Integration guidelines
- Accessibility notes

3. Testing Requirements
- Visual regression tests
- Accessibility tests
- Responsive behavior tests
- State transition tests
