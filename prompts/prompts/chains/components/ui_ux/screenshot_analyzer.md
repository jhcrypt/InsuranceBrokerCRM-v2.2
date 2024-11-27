# Screenshot Analyzer

## Overview
This tool analyzes UI screenshots to extract component requirements, generate implementation templates, and provide detailed UI analysis documents.

## Features

### Image Processing
1. UI Element Detection
   - Layout components
   - Navigation elements
   - Interactive controls
   - Content sections

2. Color Scheme Analysis
   - Primary colors
   - Secondary colors
   - Accent colors
   - Color relationships

3. Layout Analysis
   - Grid structure
   - Component spacing
   - Responsive hints
   - Alignment patterns

4. Interactive Element Mapping
   - Buttons
   - Forms
   - Links
   - Menus
   - Modal triggers

### Component Analysis

#### Layout Components
- Container structures
- Grid systems
- Flex layouts
- Positioning patterns

#### Navigation Elements
- Navigation bars
- Menus
- Breadcrumbs
- Pagination

#### Content Sections
- Headers
- Main content
- Sidebars
- Footers

#### Interactive Controls
- Button styles
- Form elements
- Input fields
- Dropdown menus

### Implementation

#### Required Utility Files
The analyzer checks for and can generate required utility files:

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

#### Standard Requirements
```typescript
interface ComponentRequirements {
  useClientDirective: boolean;
  styling: {
    framework: 'tailwind';
    customClasses: string[];
  };
  icons: {
    library: 'lucide-react';
    components: string[];
  };
  images: {
    sources: string[];
    optimization: boolean;
  };
  uniqueness: {
    prefix: string;
    namespace: string;
  };
  utilities: {
    required: string[];
    status: 'present' | 'missing';
  };
}
```

#### Component Structure
```typescript
interface UIComponent {
  name: string;
  type: ComponentType;
  props: ComponentProps;
  children: UIComponent[];
  styling: StylingConfig;
  interactions: InteractionConfig;
  utilities: UtilityRequirements;
}
```

#### Analysis Engine
```typescript
class ScreenshotAnalyzer {
  private imageProcessor: ImageProcessor;
  private componentExtractor: ComponentExtractor;
  private requirementsGenerator: RequirementsGenerator;
  private utilityChecker: UtilityChecker;

  constructor() {
    this.imageProcessor = new ImageAnalysisEngine();
    this.componentExtractor = new UIElementDetector();
    this.requirementsGenerator = new ComponentTemplateGenerator();
    this.utilityChecker = new UtilityChecker();
  }

  async analyzeScreenshot(image: Buffer): Promise<AnalysisResult> {
    const processedImage = await this.imageProcessor.process(image);
    const components = await this.componentExtractor.extract(processedImage);
    const utilities = await this.utilityChecker.checkRequiredUtils();
    return this.requirementsGenerator.generate(components, utilities);
  }
}
```

### Commands

#### #analyze-screenshot
```bash
# Analyze a screenshot and generate components
analyze-screenshot <image-path> [options]

Options:
  --output-dir    Output directory for generated files
  --format        Output format (detailed|summary)
  --template      Template type (next|react|vue)
  --check-utils   Check for required utility files
  --gen-utils     Generate missing utility files
```

#### #update-components
```bash
# Update components based on new screenshot
update-components <image-path> [options]

Options:
  --components    Path to existing components
  --diff         Show component differences
  --apply        Apply recommended changes
  --update-utils Update utility files if needed
```

### Output Formats

#### Analysis Document
```markdown
# UI Analysis Report

## Components Detected
- [Component List]

## Color Scheme
- [Color Palette]

## Layout Structure
- [Grid Analysis]

## Interactive Elements
- [Element Mapping]

## Utility Requirements
- [Required Files]
- [Missing Utilities]

## Recommendations
- [Implementation Suggestions]
```

#### Component Requirements
```yaml
component:
  name: "ComponentName"
  type: "layout|navigation|content|control"
  requirements:
    - "use client"
    - "tailwind classes"
    - "lucide icons"
    - "image optimization"
  utilities:
    - "@/lib/utils"
    - "@/components/icons"
  props:
    - name: "propName"
      type: "string|number|boolean"
      required: true|false
```

#### Implementation Template
```typescript
"use client"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface ComponentProps {
  // Generated props
}

export function Component({ ...props }: ComponentProps) {
  return (
    // Generated component structure
  )
}
```

### Validation Rules

1. Component Reusability
   - Modular structure
   - Prop flexibility
   - Style customization
   - Context independence

2. Accessibility Standards
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - Color contrast

3. Responsive Design
   - Mobile-first approach
   - Breakpoint handling
   - Flexible layouts
   - Image scaling

4. Performance
   - Code splitting
   - Lazy loading
   - Bundle size
   - Resource optimization

5. Utility Validation
   - Required files present
   - Correct import paths
   - Up-to-date utilities
   - Proper integration

### Integration

#### With Development Workflow
1. Screenshot analysis during design phase
2. Component generation in development
3. Update validation in maintenance
4. Documentation generation
5. Utility file management

#### With Other Tools
1. Design tools
2. Code generators
3. Testing frameworks
4. Documentation systems
5. Component generator

### Notes
- Follow standard requirements
- Maintain consistency
- Consider accessibility
- Optimize performance
- Document components
- Test thoroughly
- Ensure utility files are present
- Use proper import paths (@/lib/utils, @/components/icons)
