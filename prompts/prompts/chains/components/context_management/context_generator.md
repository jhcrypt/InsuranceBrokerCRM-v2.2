# Context Generator Tool

## Overview
This tool assists in creating and maintaining context files according to the Codebase Context Specification (CCS). It provides templates, validation, and best practices for context file generation.

## Features

### Context File Generation
1. Project-level context files
   - .context.md
   - .contextdocs.md
   - .contextignore

2. Directory-level context files
   - Component context
   - Module context
   - Feature context

### Templates

#### .context.md Template
```markdown
---
module-name: [Module Name]
version: [Version Number]
description: [Brief description]
related-modules:
  - name: [Related Module]
    path: [Module Path]
technologies:
  - [Technology 1]
  - [Technology 2]
conventions:
  - [Convention 1]
  - [Convention 2]
directives:
  - [Directive 1]
  - [Directive 2]
diagrams:
  - name: [Diagram Name]
    path: [Diagram Path]
architecture:
  style: [Architecture Style]
  components:
    - [Component 1]
    - [Component 2]
development:
  setup:
    - [Setup Step 1]
    - [Setup Step 2]
  commands:
    build: [Build Command]
    test: [Test Command]
---

# [Module Name]

## Overview
[Detailed module description]

## Architecture
[Architecture details]

## Development
[Development guidelines]

## Integration
[Integration points]
```

#### .contextdocs.md Template
```markdown
---
contextdocs:
  - name: [Documentation Name]
    type: [local|url|package]
    link: [Documentation Link]
    relationship: [Relationship Type]
    resources:
      - [Resource Key]: [Resource Description]
---

# External Documentation

## Overview
[Documentation overview]

## Resources
[Resource details]
```

### Usage Guidelines

1. Project Setup
   ```bash
   # Initialize context files
   context-gen init

   # Add component context
   context-gen add-component [name]

   # Update context files
   context-gen update [path]
   ```

2. Context Maintenance
   - Regular updates
   - Version control
   - Documentation sync
   - Hierarchy management

3. Best Practices
   - Keep context focused
   - Update regularly
   - Maintain hierarchy
   - Follow CCS spec

### Validation

1. Structure Validation
   - File format
   - Required fields
   - Data types
   - Path validity

2. Content Validation
   - Completeness
   - Consistency
   - Relevance
   - Accuracy

3. Integration Validation
   - Context hierarchy
   - Documentation links
   - Resource availability
   - Tool compatibility

## Implementation

### Context Generation
```typescript
interface ContextGenerator {
  init(): void;
  addComponent(name: string): void;
  updateContext(path: string): void;
  validate(): ValidationResult;
}

class ContextGeneratorImpl implements ContextGenerator {
  // Implementation details
}
```

### Template Management
```typescript
interface TemplateManager {
  getTemplate(type: ContextFileType): string;
  applyTemplate(type: ContextFileType, data: ContextData): string;
  validateTemplate(content: string): ValidationResult;
}
```

### Validation System
```typescript
interface ContextValidator {
  validateStructure(content: string): ValidationResult;
  validateContent(content: string): ValidationResult;
  validateIntegration(path: string): ValidationResult;
}
```

## Usage Examples

1. Initialize Project Context
```bash
context-gen init --name "MyProject" --type "webapp"
```

2. Add Component Context
```bash
context-gen add-component --name "AuthService" --path "src/auth"
```

3. Update Context Files
```bash
context-gen update --path "src/components"
```

4. Validate Context
```bash
context-gen validate --path "."
```

## Integration

### With Development Workflow
1. Initialize context during project setup
2. Update context with new components
3. Validate context in CI/CD
4. Maintain documentation sync

### With Other Tools
1. Documentation generators
2. Code analyzers
3. Development tools
4. CI/CD systems

## Notes
- Follow CCS specification strictly
- Keep context files updated
- Maintain proper hierarchy
- Validate regularly
- Document changes
