# Wireframe Generation Commands

## Command Structure

### 1. Atomic Component Generation

```bash
# Generate atomic components
generate-wireframes atomic --type [atom|molecule|organism] --name [component-name]

# Examples:
generate-wireframes atomic --type atom --name button
generate-wireframes atomic --type molecule --name form-field
generate-wireframes atomic --type organism --name navigation
```

### 2. User Story Wireframes

```bash
# Generate user story wireframes
generate-wireframes story --id [story-id] --state [default|error|loading|empty]

# Examples:
generate-wireframes story --id USER-001 --state default
generate-wireframes story --id USER-001 --state error
```

### 3. Data Pattern Wireframes

```bash
# Generate data patterns
generate-wireframes pattern --type [create|read|update|delete|list] --entity [entity-name]

# Examples:
generate-wireframes pattern --type create --entity user
generate-wireframes pattern --type list --entity products
```

## Command Options

### Global Options

```bash
--output [directory]     # Output directory for generated wireframes
--format [svg|png]      # Output format
--scale [number]        # Scale factor for output
--template [name]       # Use specific template
```

### Component-Specific Options

```bash
--states               # Generate all state variations
--responsive          # Generate responsive variations
--accessibility       # Include accessibility attributes
```

### Story-Specific Options

```bash
--flow                # Generate complete flow
--annotations        # Include annotations
--interactions      # Include interaction states
```

### Pattern-Specific Options

```bash
--validation         # Include validation states
--feedback          # Include feedback states
--pagination        # Include pagination (for list)
```

## Implementation

```typescript
interface WireframeCommand {
  type: 'atomic' | 'story' | 'pattern';
  subtype: string;
  name: string;
  options: WireframeOptions;
}

interface WireframeOptions {
  output?: string;
  format?: 'svg' | 'png';
  scale?: number;
  template?: string;
  states?: boolean;
  responsive?: boolean;
  accessibility?: boolean;
  flow?: boolean;
  annotations?: boolean;
  interactions?: boolean;
  validation?: boolean;
  feedback?: boolean;
  pagination?: boolean;
}

class WireframeGenerator {
  generateWireframe(command: WireframeCommand): void {
    switch (command.type) {
      case 'atomic':
        this.generateAtomicComponent(command);
        break;
      case 'story':
        this.generateStoryWireframe(command);
        break;
      case 'pattern':
        this.generateDataPattern(command);
        break;
    }
  }

  private generateAtomicComponent(command: WireframeCommand): void {
    // Implementation for atomic component generation
  }

  private generateStoryWireframe(command: WireframeCommand): void {
    // Implementation for story wireframe generation
  }

  private generateDataPattern(command: WireframeCommand): void {
    // Implementation for data pattern generation
  }
}
```

## Usage Examples

### 1. Generate Complete Component Set

```bash
# Generate all states for a button component
generate-wireframes atomic --type atom --name button --states --accessibility

# Generate responsive form field
generate-wireframes atomic --type molecule --name form-field --responsive

# Generate complete navigation with all variations
generate-wireframes atomic --type organism --name navigation --states --responsive
```

### 2. Generate User Story Flow

```bash
# Generate complete user registration flow
generate-wireframes story --id USER-REGISTRATION --flow --annotations

# Generate product checkout flow with interactions
generate-wireframes story --id CHECKOUT-FLOW --flow --interactions
```

### 3. Generate Data Management Interfaces

```bash
# Generate complete CRUD interface for users
generate-wireframes pattern --type create --entity user --validation --feedback
generate-wireframes pattern --type read --entity user
generate-wireframes pattern --type update --entity user --validation
generate-wireframes pattern --type delete --entity user --feedback
generate-wireframes pattern --type list --entity user --pagination
