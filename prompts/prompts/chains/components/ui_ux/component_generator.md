# Component Generator

## Overview
This tool generates React components based on screenshot analysis results, following Next.js and Tailwind CSS best practices.

## Features

### Component Generation
1. Layout Components
   - Container components
   - Grid systems
   - Flex layouts
   - Positioning components

2. Navigation Components
   - Navigation bars
   - Menu systems
   - Breadcrumbs
   - Pagination controls

3. Content Components
   - Headers
   - Content sections
   - Cards
   - Lists

4. Interactive Components
   - Buttons
   - Forms
   - Input fields
   - Modals

### Implementation

#### Required Utility Files

##### lib/utils.ts
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

##### components/icons.tsx
```typescript
import {
  AlertCircle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Command,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  LucideProps,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  User,
  X,
  type Icon as LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  logo: Command,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertCircle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  check: Check,
} as const
```

#### Base Structure
```typescript
interface ComponentGenerator {
  generateComponent(spec: ComponentSpec): string;
  generateStyles(spec: StyleSpec): string;
  generateTypes(spec: TypeSpec): string;
  generateTests(spec: TestSpec): string;
  generateUtilities(): void;
}

class NextJsComponentGenerator implements ComponentGenerator {
  private templateEngine: TemplateEngine;
  private styleGenerator: StyleGenerator;
  private typeGenerator: TypeGenerator;
  private testGenerator: TestGenerator;
  private utilityGenerator: UtilityGenerator;

  constructor() {
    this.templateEngine = new NextJsTemplateEngine();
    this.styleGenerator = new TailwindStyleGenerator();
    this.typeGenerator = new TypeScriptGenerator();
    this.testGenerator = new JestTestGenerator();
    this.utilityGenerator = new UtilityGenerator();
  }

  generateComponent(spec: ComponentSpec): string {
    return this.templateEngine.render('component', spec);
  }

  generateUtilities(): void {
    this.utilityGenerator.generateUtils();
    this.utilityGenerator.generateIcons();
  }
}
```

### Templates

#### Base Component
```typescript
"use client"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface {{componentName}}Props {
  className?: string;
  {{additionalProps}}
}

export function {{componentName}}({
  className,
  ...props
}: {{componentName}}Props) {
  return (
    <div className={cn(
      "{{baseClasses}}",
      className
    )}>
      {{content}}
    </div>
  )
}
```

#### Layout Component
```typescript
"use client"

import { cn } from "@/lib/utils"

interface {{componentName}}LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function {{componentName}}Layout({
  children,
  className,
}: {{componentName}}LayoutProps) {
  return (
    <div className={cn(
      "{{layoutClasses}}",
      className
    )}>
      {children}
    </div>
  )
}
```

#### Interactive Component
```typescript
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface {{componentName}}Props
  extends React.HTMLAttributes<HTMLElement> {
  {{additionalProps}}
}

export const {{componentName}} = React.forwardRef<
  HTMLElement,
  {{componentName}}Props
>(({
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn("{{interactiveClasses}}", className)}
      {...props}
    >
      {{content}}
    </div>
  )
})
{{componentName}}.displayName = "{{componentName}}"
```

### Generation Process

1. Component Analysis
```typescript
interface ComponentAnalysis {
  type: ComponentType;
  structure: ComponentStructure;
  styling: StyleDefinition;
  interactions: InteractionMap;
  accessibility: A11yRequirements;
}
```

2. Template Selection
```typescript
interface TemplateSelector {
  selectTemplate(analysis: ComponentAnalysis): Template;
  customizeTemplate(template: Template, analysis: ComponentAnalysis): Template;
}
```

3. Code Generation
```typescript
interface CodeGenerator {
  generateComponent(template: Template, analysis: ComponentAnalysis): string;
  generateTypes(analysis: ComponentAnalysis): string;
  generateTests(analysis: ComponentAnalysis): string;
  generateUtilities(): void;
}
```

### Standard Requirements

1. Client Components
```typescript
// Always include "use client" directive
"use client"

// Import necessary utilities
import { cn } from "@/lib/utils"
```

2. Tailwind Integration
```typescript
// Use cn utility for class merging
className={cn(
  "base-classes",
  conditionalClasses,
  className
)}
```

3. Icon Integration
```typescript
// Import from icons component
import { Icons } from "@/components/icons"

// Use in component
<Icons.iconName className="icon-classes" />
```

4. Image Handling
```typescript
// Import Image component
import Image from "next/image"

// Use with optimization
<Image
  src={src}
  alt={alt}
  width={width}
  height={height}
  className={className}
/>
```

### Component Types

#### Layout Components
```typescript
interface LayoutComponent {
  type: 'layout';
  structure: {
    grid?: GridConfig;
    flex?: FlexConfig;
    positioning?: PositionConfig;
  };
}
```

#### Navigation Components
```typescript
interface NavigationComponent {
  type: 'navigation';
  structure: {
    items: NavItem[];
    activeState: StateConfig;
    responsiveConfig: ResponsiveConfig;
  };
}
```

#### Content Components
```typescript
interface ContentComponent {
  type: 'content';
  structure: {
    sections: Section[];
    typography: TypographyConfig;
    spacing: SpacingConfig;
  };
}
```

#### Interactive Components
```typescript
interface InteractiveComponent {
  type: 'interactive';
  structure: {
    states: StateConfig[];
    events: EventHandler[];
    animations: AnimationConfig[];
  };
}
```

### Validation

1. Component Structure
   - Proper nesting
   - Semantic HTML
   - Prop types
   - Event handlers

2. Styling
   - Tailwind classes
   - Responsive design
   - Theme compatibility
   - Style isolation

3. Accessibility
   - ARIA attributes
   - Keyboard navigation
   - Screen reader support
   - Focus management

4. Performance
   - Code splitting
   - Bundle size
   - Render optimization
   - Memory usage

### Integration

#### With Development Workflow
1. Component generation
2. Style system
3. Testing framework
4. Documentation

#### With Other Tools
1. Design systems
2. Style guides
3. Testing utilities
4. Documentation generators

### Commands

#### #generate-component
```bash
# Generate a new component
generate-component <name> [options]

Options:
  --type        Component type (layout|navigation|content|interactive)
  --template    Template to use (base|layout|interactive)
  --utils       Generate missing utility files (true|false)
```

#### #update-component
```bash
# Update an existing component
update-component <name> [options]

Options:
  --template    New template to use
  --merge       Merge with existing code (true|false)
  --utils       Update utility files (true|false)
```

### Notes
- Follow Next.js best practices
- Use Tailwind CSS effectively
- Maintain accessibility
- Optimize performance
- Document components
- Write tests
- Ensure utility files are generated
- Use proper import paths (@/lib/utils, @/components/icons)
