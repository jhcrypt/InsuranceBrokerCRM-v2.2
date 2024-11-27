# Code Improver Agent

## Interface Definition
Input:
- evaluationReport: EvaluationReport
- codebase: string
- sdlcContext: {
  principles: {
    kiss: string[],
    yagni: string[],
    solid: Record<string, string[]>
  },
  qualityGates: {
    thresholds: Record<string, number>,
    requiredChecks: string[]
  }
}
- improvementConfig?: {
  priority: string[],
  constraints: string[],
  targetScore: number
}

Output:
- improvementResult: {
  improvedCode: string,
  changes: Change[],
  metrics: Metrics,
  principleAlignment: Record<string, number>
}

## Neo SDLC Integration

### 1. Principle-Driven Improvements

#### KISS Implementation
```typescript
interface KISSImprovements {
  simplification: {
    complexityReduction: string[];
    readabilityEnhancements: string[];
    dependencyOptimization: string[];
  };
  naming: {
    clarification: string[];
    standardization: string[];
    contextAlignment: string[];
  };
  structure: {
    modularization: string[];
    componentFocus: string[];
    interfaceSimplification: string[];
  };
}
```

#### YAGNI Implementation
```typescript
interface YAGNIImprovements {
  codeReduction: {
    unusedRemoval: string[];
    speculativeCleanup: string[];
    featureFocus: string[];
  };
  optimization: {
    scopeAlignment: string[];
    requirementMapping: string[];
    valueValidation: string[];
  };
}
```

#### SOLID Implementation
```typescript
interface SOLIDImprovements {
  singleResponsibility: {
    componentSplitting: string[];
    responsibilityIsolation: string[];
    cohesionImprovement: string[];
  };
  openClosed: {
    abstractionCreation: string[];
    extensionPoints: string[];
    interfaceDefinition: string[];
  };
  liskovSubstitution: {
    contractEnforcement: string[];
    inheritanceRefactor: string[];
    typeValidation: string[];
  };
  interfaceSegregation: {
    interfaceRefactor: string[];
    clientAlignment: string[];
    dependencyReduction: string[];
  };
  dependencyInversion: {
    abstractionIntroduction: string[];
    dependencyInjection: string[];
    couplingReduction: string[];
  };
}
```

## Improvement Process

### 1. Analysis Phase
- Parse evaluation report
- Map principle violations
- Identify improvement opportunities
- Create prioritized plan
- Validate against SDLC context

### 2. Implementation Phase
```typescript
interface ImprovementPhase {
  planning: {
    priorities: string[];
    dependencies: string[];
    constraints: string[];
  };
  execution: {
    changes: Change[];
    validation: string[];
    metrics: Metrics[];
  };
  verification: {
    tests: string[];
    principles: Record<string, boolean>;
    quality: Record<string, number>;
  };
}
```

### 3. Validation Phase
- Test improvements
- Verify principle compliance
- Calculate quality metrics
- Generate improvement report
- Track progress

## Change Management

```typescript
interface Change {
  type: 'refactor' | 'optimize' | 'fix' | 'enhance';
  category: 'kiss' | 'yagni' | 'solid' | 'quality';
  location: string;
  description: string;
  principle?: {
    name: string;
    aspect: string;
  };
  impact: {
    scope: string;
    risk: number;
    benefit: number;
  };
  before: string;
  after: string;
}
```

## Integration Points

### 1. Implementation Analyst Agent
- Receive improvement requirements
- Report progress
- Validate changes
- Update metrics

### 2. Morpheus Agent
- Validate principle alignment
- Review improvements
- Approve changes
- Guide refinements

### 3. Version Control Agent
- Track improvements
- Store metrics
- Manage history
- Generate reports

## Output Format

```typescript
interface ImprovementResult {
  metadata: {
    timestamp: string;
    version: string;
    context: SDLCContext;
  };
  improvements: {
    changes: Change[];
    metrics: Metrics;
    principles: Record<string, number>;
  };
  validation: {
    tests: TestResult[];
    quality: QualityMetrics;
    compliance: PrincipleCompliance;
  };
  summary: {
    overview: string;
    highlights: string[];
    nextSteps: string[];
  };
}
```

## Usage Example

```json
{
  "improvementConfig": {
    "priority": ["solid-violations", "complexity"],
    "constraints": ["maintain-api", "max-complexity"],
    "targetScore": 4.5,
    "principles": {
      "kiss": true,
      "yagni": true,
      "solid": ["single-responsibility", "open-closed"]
    }
  }
}
```

## Error Recovery

### 1. Change Validation
- Syntax verification
- Principle compliance
- Test execution
- Quality metrics

### 2. Rollback Management
- Change tracking
- State preservation
- Recovery points
- History management

### 3. Progress Protection
- Metric preservation
- Quality assurance
- Principle maintenance
- Improvement verification

## Metrics Tracking

```typescript
interface Metrics {
  quality: {
    before: number;
    after: number;
    delta: number;
  };
  principles: {
    kiss: number;
    yagni: number;
    solid: Record<string, number>;
  };
  impact: {
    risk: number;
    benefit: number;
    confidence: number;
  };
}
