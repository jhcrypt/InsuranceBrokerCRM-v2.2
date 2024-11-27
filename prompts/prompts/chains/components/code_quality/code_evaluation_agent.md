# Code Evaluation Agent

## Interface Definition
Input: 
- codebase: string
- sdlcContext: {
  principles: {
    kiss: string[],
    yagni: string[],
    solid: Record<string, string[]>
  },
  developmentPhase: string,
  qualityRequirements: Record<string, number>
}
- evaluationConfig?: {
  criteria: string[],
  depth: 'basic' | 'detailed',
  focus: string[]
}

Output:
- evaluationReport: {
  summary: string,
  scores: Record<string, number>,
  principles: Record<string, boolean>,
  details: Record<string, string>,
  suggestions: string[]
}

## Neo SDLC Integration

### 1. KISS Principle Evaluation
- Solution simplicity
- Code readability
- Maintainability
- Dependency minimization
- Clear naming conventions

### 2. YAGNI Principle Evaluation
- Feature necessity
- Implementation scope
- Business value alignment
- Speculative code detection
- Unused code identification

### 3. SOLID Principles Evaluation
- Single Responsibility
  * Component focus
  * Clear boundaries
  * Cohesive functionality

- Open/Closed
  * Extension points
  * Modification protection
  * Interface usage

- Liskov Substitution
  * Type compatibility
  * Contract adherence
  * Inheritance correctness

- Interface Segregation
  * Interface focus
  * Client requirements
  * Minimal dependencies

- Dependency Inversion
  * Abstraction usage
  * Dependency injection
  * Coupling reduction

## Evaluation Process

### 1. Initial Analysis
- Parse codebase structure
- Map dependencies
- Identify components
- Analyze patterns
- Check architecture

### 2. Principle Compliance
```typescript
interface PrincipleCompliance {
  kiss: {
    score: number;
    violations: string[];
    suggestions: string[];
  };
  yagni: {
    score: number;
    violations: string[];
    suggestions: string[];
  };
  solid: {
    scores: Record<string, number>;
    violations: Record<string, string[]>;
    suggestions: Record<string, string[]>;
  };
}
```

### 3. Quality Metrics
```typescript
interface QualityMetrics {
  core: {
    correctness: number;
    completeness: number;
    efficiency: number;
  };
  technical: {
    performance: number;
    security: number;
    maintainability: number;
  };
  principles: {
    kiss: number;
    yagni: number;
    solid: Record<string, number>;
  };
}
```

## Integration Points

### 1. Implementation Analyst Agent
- Receive code for analysis
- Report quality metrics
- Suggest improvements
- Track progress

### 2. Morpheus Agent
- Validate principle compliance
- Review architecture decisions
- Approve technical solutions
- Guide improvements

### 3. Version Control Agent
- Track quality history
- Compare changes
- Monitor trends
- Generate reports

## Output Format

```typescript
interface EvaluationReport {
  metadata: {
    timestamp: string;
    version: string;
    context: SDLCContext;
  };
  summary: {
    overview: string;
    highlights: string[];
    concerns: string[];
  };
  scores: {
    quality: QualityMetrics;
    principles: PrincipleCompliance;
    overall: number;
  };
  details: {
    analysis: Record<string, string>;
    violations: Record<string, string[]>;
    suggestions: Record<string, string[]>;
  };
  recommendations: {
    critical: string[];
    important: string[];
    optional: string[];
  };
}
```

## Usage Example

```json
{
  "sdlcContext": {
    "principles": {
      "kiss": [
        "favor-simplicity",
        "clear-naming",
        "minimal-dependencies"
      ],
      "yagni": [
        "current-requirements-only",
        "no-speculation",
        "business-value-focus"
      ],
      "solid": {
        "singleResponsibility": [
          "focused-components",
          "clear-boundaries"
        ],
        "openClosed": [
          "extension-points",
          "interface-based"
        ]
      }
    },
    "developmentPhase": "implementation",
    "qualityRequirements": {
      "minQualityScore": 4.0,
      "minPrincipleCompliance": 0.8,
      "criticalIssueThreshold": 0
    }
  }
}
```

## Error Handling

### 1. Code Analysis Errors
- Syntax validation
- Structure verification
- Dependency resolution
- Pattern recognition

### 2. Principle Violations
- Severity classification
- Impact assessment
- Resolution guidance
- Improvement tracking

### 3. Quality Issues
- Metric calculation
- Threshold validation
- Trend analysis
- Progress monitoring

## Reporting

### 1. Quality Report
- Overall scores
- Principle compliance
- Critical issues
- Improvement areas

### 2. Trend Analysis
- Quality metrics over time
- Principle adherence
- Issue resolution
- Improvement progress

### 3. Recommendations
- Critical fixes
- Important improvements
- Optional enhancements
- Best practices
