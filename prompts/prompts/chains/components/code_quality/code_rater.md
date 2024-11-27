# Code Rating Agent

## Interface Definition
Input:
- improvedCode: string
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
- ratingConfig?: {
  weights: Record<string, number>,
  thresholds: Record<string, number>,
  customMetrics?: string[]
}

Output:
- ratingReport: {
  scores: Record<string, number>,
  principleCompliance: Record<string, number>,
  analysis: string,
  recommendations: string[],
  decision: 'approve' | 'revise' | 'escalate'
}

## Neo SDLC Integration

### 1. Principle-Based Rating Categories

#### KISS Evaluation (30%)
```typescript
interface KISSMetrics {
  simplicity: {
    codeComplexity: number;
    readability: number;
    maintainability: number;
  };
  clarity: {
    naming: number;
    structure: number;
    documentation: number;
  };
  efficiency: {
    dependencies: number;
    resourceUsage: number;
    performance: number;
  };
}
```

#### YAGNI Evaluation (30%)
```typescript
interface YAGNIMetrics {
  necessity: {
    featureRelevance: number;
    codeUtilization: number;
    businessAlignment: number;
  };
  focus: {
    scopeAccuracy: number;
    requirementCoverage: number;
    valueDelivery: number;
  };
}
```

#### SOLID Evaluation (40%)
```typescript
interface SOLIDMetrics {
  singleResponsibility: {
    componentFocus: number;
    responsibilityIsolation: number;
    changeImpact: number;
  };
  openClosed: {
    extensibility: number;
    modificationProtection: number;
    abstractionUsage: number;
  };
  liskovSubstitution: {
    typeCompatibility: number;
    contractAdherence: number;
    inheritanceCorrectness: number;
  };
  interfaceSegregation: {
    interfaceCohesion: number;
    clientDependencies: number;
    granularity: number;
  };
  dependencyInversion: {
    abstractionLevel: number;
    dependencyDirection: number;
    couplingDegree: number;
  };
}
```

## Rating Process

### 1. Quality Assessment
```typescript
interface QualityAssessment {
  codeQuality: {
    structure: number;
    style: number;
    documentation: number;
  };
  functionality: {
    correctness: number;
    reliability: number;
    performance: number;
  };
  maintenance: {
    extensibility: number;
    reusability: number;
    testability: number;
  };
}
```

### 2. Principle Compliance
```typescript
interface PrincipleCompliance {
  kiss: {
    score: number;
    violations: string[];
    improvements: string[];
  };
  yagni: {
    score: number;
    violations: string[];
    improvements: string[];
  };
  solid: {
    scores: Record<string, number>;
    violations: Record<string, string[]>;
    improvements: Record<string, string[]>;
  };
}
```

### 3. Impact Analysis
```typescript
interface ImpactAnalysis {
  quality: {
    before: number;
    after: number;
    delta: number;
  };
  principles: {
    before: Record<string, number>;
    after: Record<string, number>;
    delta: Record<string, number>;
  };
  metrics: {
    performance: number;
    maintainability: number;
    reliability: number;
  };
}
```

## Decision Making

### 1. Approval Criteria
```typescript
interface ApprovalCriteria {
  qualityThresholds: {
    minimum: number;
    target: number;
    optimal: number;
  };
  principleCriteria: {
    kiss: number;
    yagni: number;
    solid: Record<string, number>;
  };
  impactThresholds: {
    performance: number;
    quality: number;
    principles: number;
  };
}
```

### 2. Revision Triggers
- Quality score below threshold
- Principle violation severity
- Critical issue presence
- Performance degradation
- Security concerns

### 3. Escalation Criteria
- Multiple revision failures
- Systemic issues
- Architecture concerns
- Security vulnerabilities
- Performance crises

## Integration Points

### 1. Implementation Analyst Agent
- Receive quality metrics
- Report ratings
- Guide improvements
- Track progress

### 2. Morpheus Agent
- Validate decisions
- Review ratings
- Approve changes
- Guide refinements

### 3. Version Control Agent
- Track ratings
- Store metrics
- Manage history
- Generate reports

## Output Format

```typescript
interface RatingReport {
  metadata: {
    timestamp: string;
    version: string;
    context: SDLCContext;
  };
  scores: {
    quality: QualityAssessment;
    principles: PrincipleCompliance;
    impact: ImpactAnalysis;
  };
  analysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    risks: string[];
  };
  recommendations: {
    critical: string[];
    important: string[];
    optional: string[];
  };
  decision: {
    verdict: 'approve' | 'revise' | 'escalate';
    rationale: string[];
    nextSteps: string[];
  };
}
```

## Usage Example

```json
{
  "ratingConfig": {
    "weights": {
      "kiss": 0.3,
      "yagni": 0.3,
      "solid": 0.4
    },
    "thresholds": {
      "quality": 4.0,
      "principles": 0.8,
      "impact": 0.5
    },
    "customMetrics": [
      "security-score",
      "performance-impact",
      "maintainability-index"
    ]
  }
}
```

## Metrics Collection

### 1. Quality Metrics
- Code quality scores
- Functionality metrics
- Maintenance indices
- Performance measures

### 2. Principle Metrics
- KISS compliance
- YAGNI adherence
- SOLID conformance
- Overall alignment

### 3. Impact Metrics
- Quality improvements
- Principle alignment
- Performance impact
- Maintenance effect
