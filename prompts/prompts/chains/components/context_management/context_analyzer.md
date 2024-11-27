# Context Analyzer Tool

## Overview
This tool analyzes context files and their hierarchies to provide insights, validate relationships, and ensure proper context accumulation throughout the project structure.

## Features

### Context Analysis
1. Hierarchy Analysis
   - Context accumulation
   - Relationship mapping
   - Dependency tracking
   - Conflict detection

2. Content Analysis
   - Completeness check
   - Consistency validation
   - Relevance assessment
   - Coverage analysis

3. Integration Analysis
   - Cross-reference validation
   - Documentation linkage
   - Tool compatibility
   - System integration

### Analysis Types

#### Structure Analysis
```typescript
interface StructureAnalysis {
  hierarchyDepth: number;
  contextFiles: ContextFile[];
  relationships: Relationship[];
  coverage: Coverage;
}

interface ContextFile {
  path: string;
  type: ContextFileType;
  level: HierarchyLevel;
  dependencies: string[];
}
```

#### Content Analysis
```typescript
interface ContentAnalysis {
  completeness: CompletenessScore;
  consistency: ConsistencyScore;
  relevance: RelevanceScore;
  quality: QualityMetrics;
}

interface QualityMetrics {
  documentation: number;
  specificity: number;
  accuracy: number;
  freshness: number;
}
```

#### Integration Analysis
```typescript
interface IntegrationAnalysis {
  crossReferences: CrossReference[];
  docLinks: DocumentationLink[];
  toolCompatibility: ToolCompatibility[];
  systemIntegration: SystemIntegration[];
}
```

### Usage

1. Basic Analysis
```bash
# Analyze project context
context-analyze .

# Analyze specific directory
context-analyze src/components

# Generate analysis report
context-analyze --report
```

2. Detailed Analysis
```bash
# Full hierarchy analysis
context-analyze --hierarchy

# Content quality analysis
context-analyze --content

# Integration validation
context-analyze --integration
```

3. Continuous Monitoring
```bash
# Watch mode
context-analyze --watch

# CI/CD integration
context-analyze --ci
```

### Implementation

#### Analyzer Core
```typescript
interface ContextAnalyzer {
  analyzeStructure(path: string): StructureAnalysis;
  analyzeContent(path: string): ContentAnalysis;
  analyzeIntegration(path: string): IntegrationAnalysis;
  generateReport(): AnalysisReport;
}

class ContextAnalyzerImpl implements ContextAnalyzer {
  // Implementation details
}
```

#### Analysis Engine
```typescript
interface AnalysisEngine {
  analyze(type: AnalysisType, target: string): Analysis;
  validate(analysis: Analysis): ValidationResult;
  report(analysis: Analysis): Report;
}
```

#### Reporting System
```typescript
interface ReportGenerator {
  generateStructureReport(analysis: StructureAnalysis): Report;
  generateContentReport(analysis: ContentAnalysis): Report;
  generateIntegrationReport(analysis: IntegrationAnalysis): Report;
}
```

### Analysis Reports

#### Structure Report
```markdown
# Context Structure Analysis

## Hierarchy Overview
- Depth: [Number of levels]
- Files: [Number of context files]
- Coverage: [Percentage coverage]

## Relationships
- Direct: [Number]
- Indirect: [Number]
- Missing: [Number]

## Issues
- Conflicts: [List of conflicts]
- Gaps: [List of gaps]
- Recommendations: [List of recommendations]
```

#### Content Report
```markdown
# Context Content Analysis

## Quality Metrics
- Completeness: [Score]
- Consistency: [Score]
- Relevance: [Score]
- Freshness: [Score]

## Issues
- Incomplete sections: [List]
- Inconsistencies: [List]
- Outdated content: [List]

## Recommendations
- [List of improvements]
```

#### Integration Report
```markdown
# Context Integration Analysis

## Cross-References
- Valid: [Number]
- Invalid: [Number]
- Missing: [Number]

## Documentation Links
- Active: [Number]
- Broken: [Number]
- Outdated: [Number]

## Tool Compatibility
- Compatible: [List]
- Issues: [List]
```

### Best Practices

1. Analysis
   - Regular analysis runs
   - Comprehensive coverage
   - Multiple analysis types
   - Continuous monitoring

2. Validation
   - Structure validation
   - Content validation
   - Integration validation
   - Regular updates

3. Reporting
   - Clear metrics
   - Actionable insights
   - Regular reports
   - Issue tracking

4. Maintenance
   - Keep analysis up-to-date
   - Address issues promptly
   - Monitor changes
   - Update documentation

## Integration

### With Development Workflow
1. Regular analysis runs
2. CI/CD integration
3. Issue tracking
4. Documentation updates

### With Other Tools
1. Documentation generators
2. Code analyzers
3. Quality tools
4. Monitoring systems

## Notes
- Regular analysis is crucial
- Address issues promptly
- Maintain documentation
- Keep tools updated
- Monitor changes
- Track improvements
