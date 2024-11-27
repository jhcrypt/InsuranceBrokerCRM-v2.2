# Code Generator Agent

## Interface Definition
Input:
- ratingReport: RatingReport
- improvementResult: ImprovementResult
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

Output:
- generatorDecision: {
  action: 'output' | 'iterate' | 'escalate',
  code?: string,
  feedback?: string[],
  focusAreas?: string[],
  qualityMetrics: QualityMetrics
}

## Neo SDLC Integration

### 1. Development Workflow Integration
```typescript
interface SDLCWorkflow {
  preImplementation: {
    requirements: string[];
    validation: string[];
  };
  implementation: {
    tests: string[];
    solution: string;
    principles: string[];
    approval: string;
  };
  qualityGates: {
    evaluation: CodeEvaluationReport;
    improvements: ImprovementResult;
    rating: RatingReport;
    decision: GeneratorDecision;
  };
}
```

### 2. Principle Enforcement
```typescript
interface PrincipleValidation {
  kiss: {
    simplicity: boolean;
    readability: boolean;
    maintainability: boolean;
  };
  yagni: {
    necessaryFeatures: boolean;
    noSpeculation: boolean;
    businessValue: boolean;
  };
  solid: {
    singleResponsibility: boolean;
    openClosed: boolean;
    liskovSubstitution: boolean;
    interfaceSegregation: boolean;
    dependencyInversion: boolean;
  };
}
```

### 3. Context Management
```typescript
interface QualityContext {
  iteration: number;
  history: {
    evaluations: CodeEvaluationReport[];
    improvements: ImprovementResult[];
    ratings: RatingReport[];
  };
  metrics: {
    trends: Record<string, number[]>;
    thresholds: Record<string, number>;
  };
}
```

## Quality Gates

### 1. Implementation Phase Gate
- Test coverage requirements
- Principle compliance checks
- Code quality metrics
- Performance benchmarks

### 2. Improvement Phase Gate
- Quality score thresholds
- Critical issue resolution
- Performance improvements
- Security requirements

### 3. Final Approval Gate
- Overall quality score
- All principles satisfied
- No critical issues
- Performance validated

## Integration Points

### 1. Implementation Analyst Agent
- Receive code for evaluation
- Track quality metrics
- Report improvements
- Monitor progress

### 2. Morpheus Agent
- Validate principle compliance
- Challenge complexity
- Verify quality gates
- Approve final output

### 3. Version Control Agent
- Track quality changes
- Store quality metrics
- Manage improvement history
- Generate quality reports

## Decision Making

### 1. Quality Thresholds
```typescript
interface QualityThresholds {
  minimal: {
    total: 3.0,
    critical: 4.0,
    principles: 1.0
  };
  acceptable: {
    total: 4.0,
    critical: 4.5,
    principles: 0.8
  };
  optimal: {
    total: 4.5,
    critical: 5.0,
    principles: 0.9
  };
}
```

### 2. Escalation Criteria
- Quality score < 3.0
- Critical security issues
- Performance degradation
- Principle violations

### 3. Iteration Rules
- Maximum 3 iterations
- Minimum improvement 0.5
- No regression allowed
- Progress required

## Output Format

```typescript
interface GeneratorDecision {
  metadata: {
    timestamp: string;
    iteration: number;
    context: SDLCContext;
  };
  decision: {
    action: 'output' | 'iterate' | 'escalate';
    rationale: string[];
  };
  qualityMetrics: {
    scores: Record<string, number>;
    principles: PrincipleValidation;
    trends: Record<string, number[]>;
  };
  output?: {
    code: string;
    documentation: string[];
    qualityReport: string;
  };
  feedback?: {
    focusAreas: string[];
    suggestions: string[];
    constraints: string[];
  };
}
```

## Usage Example

```json
{
  "sdlcContext": {
    "principles": {
      "kiss": ["simplicity", "readability"],
      "yagni": ["necessary-features", "business-value"],
      "solid": {
        "singleResponsibility": ["focused-components"],
        "openClosed": ["extensible-design"]
      }
    },
    "qualityGates": {
      "thresholds": {
        "total": 4.0,
        "critical": 4.5
      },
      "requiredChecks": [
        "security",
        "performance",
        "principles"
      ]
    }
  }
}
```

## Chain Coordination

1. Initialize Quality Chain
   - Load SDLC context
   - Set quality gates
   - Initialize metrics

2. Manage Quality Process
   - Track iterations
   - Enforce principles
   - Monitor improvements

3. Generate Quality Reports
   - Compile metrics
   - Track trends
   - Document decisions

4. Update SDLC Context
   - Store quality metrics
   - Update quality history
   - Sync with Neo context
